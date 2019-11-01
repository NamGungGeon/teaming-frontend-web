import React, { Component } from 'react';
import styles from './Chatting.module.css';
import ChatMsg from '../../components/ChatMsg/ChatMsg';
import { quickConnect } from '../../redux';
import { isEndScroll, scrollToBottom } from '../../lib/utils';
import ReactDOM from 'react-dom';
import ChatInputBox from '../../components/ChatInputBox/ChatInputBox';

/**
 * cdm: 센드버드랑 연결 (앱ID 등록 / 유저 연결)
 * 유저 연결: 초기에는 unique random string 사용하고 user 붙으면 uid 해싱해서 보내면 됨
 * cwu: 센드버드랑 연결해제
 * 채널 생성: wrapper(Chat) component 에서 생성한 후 연결
 */

class Chatting extends Component {
  state = {
    /*
    msgs: [
      { profile: null, msg: 'sfgasdgasgasg', encounter: true },
      { profile: null, msg: 'sfgasdgasgasg', encounter: true },
      { profile: null, msg: 'sfgasdgasgasg', encounter: true },
      { profile: null, msg: 'sfgasdgasgasg', encounter: true },
      { profile: null, msg: 'sfgasdgasgasg', encounter: true },
      { profile: null, msg: 'sdeee', encounter: false },
      { profile: null, msg: 'sfgasdgasgasg', encounter: true },
      { profile: null, msg: 'sfgasdgasgasg', encounter: true }
    ],
     */
    msgs: [],
    ring: false,
    needScroll: false
  };

  componentDidMount() {
    /*
    window.setInterval(() => {
      const { msgs } = this.state;
      msgs.push({
        encounter: true,
        msg: randStr(10),
        profile: null
      });
      this.setState({
        ...this.state,
        msgs
      });
    }, 800);
    */
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (isEndScroll(this.msgBox) && !this.state.needScroll)
      nextState.needScroll = true;
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

  render() {
    const { uiKit } = this.props;
    const { msgs, ring } = this.state;
    return (
      <div className={styles.wrapper}>
        <div className={styles.chatMsgs} ref={ref => (this.msgBox = ref)}>
          {msgs.map((msg, idx) => {
            return <ChatMsg {...msg} />;
          })}

          {ring && (
            <div
              className={styles.ring}
              onClick={() => {
                scrollToBottom(this.msgBox);
              }}
            >
              {msgs[msgs.length - 1].msg}
            </div>
          )}
        </div>
        <div className={styles.chatInput}>
          <ChatInputBox
            submit={msg => {
              if (!msg) {
                uiKit.toaster.cooking('텍스트를 입력하세요');
                return true;
              }
              msgs.push({
                msg,
                encounter: false,
                profile: null
              });
              this.setState({
                ...this.state,
                msgs
              });
              scrollToBottom(this.msgBox);
              this.inputBox.flush();
            }}
            ref={ref => {
              ReactDOM.findDOMNode(this).addEventListener('scroll', e => {
                if (isEndScroll(ref))
                  this.setState({
                    ...this.state,
                    ring: false
                  });
              });
              this.inputBox = ref;
            }}
          />
        </div>
      </div>
    );
  }
}

export default quickConnect(Chatting);
