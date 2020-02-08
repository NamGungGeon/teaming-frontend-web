import React, { Component } from 'react';
import styles from './Chatting.module.css';
import ChatMsg from '../../primitive/ChatMsg/ChatMsg';
import { quickConnect } from '../../../redux/quick';
import { isEndScroll, scrollToBottom } from '../../../utils/utils';
import ChatInputBox from '../../primitive/ChatInputBox/ChatInputBox';
import Section from '../../primitive/Section/Section';

class Chatting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msgs: [
        {
          alert: (
            <div>
              매칭되었습니다
              <br />
              <br />
              성희롱이나 폭언과 같은 행위가 발각되면 이용 제재 및 정보통신망법에
              의거 처벌받을 수 있습니다
              <br />
              상대방과 실제 전화번호와 같은 개인정보를 주고받을 떄에는 반드시
              신중하게 생각하세요
            </div>
          )
        }
      ],
      ring: false
    };
  }

  componentDidMount() {
    this.msgBox.addEventListener('scroll', () => {
      if (isEndScroll(this.msgBox))
        this.setState({
          ...this.state,
          ring: false
        });
    });

    //welcome!
    const { socket } = this.props;

    socket.on('MESSAGE', text => {
      if (text) {
        this.renderMsg(text, true);
      }
    });

    socket.on('OPPONENT_LEFT', () => {
      const { msgs } = this.state;
      this.setState(
        {
          msgs: [
            ...msgs,
            {
              alert: '상대가 나갔습니다'
            }
          ]
        },
        () => {
          scrollToBottom(this.msgBox);
        }
      );
    });
  }

  renderMsg = (text, isOpponent) => {
    const { uiKit, socket } = this.props;
    const { msgs } = this.state;

    if (socket.disconnected) {
      uiKit.toaster.cooking('이미 종료된 대화입니다');
      return;
    }
    if (!text) {
      uiKit.toaster.cooking('메시지를 입력하세요');
      return;
    }

    const endScroll = isEndScroll(this.msgBox);
    this.setState(
      {
        ...this.state,
        msgs: [
          ...msgs,
          {
            profile: null,
            encounter: isOpponent,
            msg: text
          }
        ]
      },
      () => {
        if (endScroll) scrollToBottom(this.msgBox);
        else
          this.setState({
            ...this.state,
            ring: true
          });
      }
    );
  };

  render() {
    const { msgs, ring } = this.state;
    const { socket, room, config } = this.props;
    return (
      <Section
        divideStyle={'fill'}
        className={styles.wrapper}
        style={
          config.hideNav
            ? {
                top: 0,
                height: '100%'
              }
            : {}
        }
      >
        <div className={styles.chatMsgs} ref={ref => (this.msgBox = ref)}>
          {msgs.map((msg, idx) => {
            return <ChatMsg key={idx} {...msg} />;
          })}
          {ring && (
            <div
              onClick={() => {
                scrollToBottom(this.msgBox);
                this.setState({
                  ...this.state,
                  ring: false
                });
              }}
              className={styles.ring}
            >
              새로운 메시지가 있습니다
            </div>
          )}
        </div>
        <div className={styles.chatInput}>
          <ChatInputBox
            sendMessage={text => {
              scrollToBottom(this.msgBox);

              socket.emit('MESSAGE', text, room);
              this.renderMsg(text, false);
            }}
          />
        </div>
      </Section>
    );
  }
}

export default quickConnect(Chatting);
