import React, { Component } from 'react';
import styles from './Chatting.module.css';
import ChatMsg from '../../primitive/ChatMsg/ChatMsg';
import { quickConnect } from '../../redux';
import { isEndScroll, scrollToBottom } from '../../utils/utils';
import ChatInputBox from '../../primitive/ChatInputBox/ChatInputBox';
import Section from "../../primitive/Section/Section";

class Chatting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msgs: [],
      ring: false,
      needScroll: false
    };
  }

  componentDidMount() {
    const { socket } = this.props;

    socket.on('MESSAGE', text => {
      const { msgs } = this.state;
      this.setState({
        msgs: [
          ...msgs,
          {
            profile: null,
            msg: text,
            encounter: true
          }
        ]
      });
    });
  }

  sendMessage = text => {
    const { uiKit, socket, room } = this.props;
    const { msgs } = this.state;
    if (!text) {
      uiKit.toaster.cooking('텍스트를 입력하세요');
    }

    this.setState({
      msgs: [
        ...msgs,
        {
          profile: null,
          msg: text,
          encounter: false
        }
      ]
    });

    socket.emit('MESSAGE', text, room);

    scrollToBottom(this.msgBox);
  };

  render() {
    const { msgs } = this.state;
    return (
      <Section
        style={{
          margin: '0',
        }}
        divideStyle={'fill'}
        className={styles.wrapper}>
        <div className={styles.chatMsgs} ref={ref => (this.msgBox = ref)}>
          {msgs.map((msg, idx) => {
            return <ChatMsg key={idx} {...msg} />;
          })}
        </div>
        <div className={styles.chatInput}>
          <ChatInputBox sendMessage={this.sendMessage} />
        </div>
      </Section>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.needScroll) {
      scrollToBottom(this.msgBox);
      this.setState({
        ...this.state,
        needScroll: false,
        ring: false
      });
    }

    if (!isEndScroll(this.msgBox) && !this.state.ring) {
      this.setState({
        ...this.state,
        ring: true
      });
    }
  }
}

export default quickConnect(Chatting);
