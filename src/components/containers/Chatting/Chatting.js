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
      msgs: [{
        alert: (
          <div style={{
            color: '#FFFFFF99'
          }}>
            매칭되었습니다
            <br/><br/>
            성희롱이나 폭언과 같은 행위가 발각되면 이용 제재 및 정보통신망법에 의거 처벌받을 수 있습니다
            <br/>
            상대방과 실제 전화번호와 같은 개인정보를 주고받을 떄에는 반드시 신중하게 생각하세요
          </div>
        ),
      }],
      ring: false,
      needScroll: false
    };
  }

  componentDidMount() {
    //welcome!
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
    socket.on('OPPONENT_LEFT', text => {
      const { msgs } = this.state;
      this.setState({
        msgs: [
          ...msgs,
          {
            alert: '상대가 나갔습니다'
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
          width: '100%',
          height: '100%',
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
