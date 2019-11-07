import React, { Component } from 'react';
import styles from './Chatting.module.css';
import ChatMsg from '../../components/ChatMsg/ChatMsg';
import { quickConnect } from '../../redux';
import { isEndScroll, scrollToBottom } from '../../lib/utils';
import ChatInputBox from '../../components/ChatInputBox/ChatInputBox';

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
    const { handler, registerHandler } = this.props;
    handler.onMessageReceived = this.handleMessageReceived;
    registerHandler(handler);
  }

  handleMessageReceived = (channel, message) => {
    const { msgs } = this.state;
    this.setState({
      msgs: [
        ...msgs,
        {
          profile: null,
          msg: message.message,
          encounter: true
        }
      ]
    });
  };

  sendMessage = text => {
    const { uiKit, channel } = this.props;
    const { msgs } = this.state;
    if (!text) {
      uiKit.toaster.cooking('텍스트를 입력하세요');
    }

    channel.sendUserMessage(text, (message, error) => {
      if (message) {
        this.setState({
          msgs: [
            ...msgs,
            {
              profile: null,
              msg: message.message,
              encounter: false
            }
          ]
        });
      }
    });

    scrollToBottom(this.msgBox);
  };

  render() {
    const { msgs } = this.state;
    return (
      <div className={styles.wrapper}>
        <div className={styles.chatMsgs} ref={ref => (this.msgBox = ref)}>
          {msgs.map((msg, idx) => {
            return <ChatMsg key={idx} {...msg} />;
          })}
        </div>
        <div className={styles.chatInput}>
          <ChatInputBox sendMessage={this.sendMessage} />
        </div>
      </div>
    );
  }

  componentDidUpdate() {
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
