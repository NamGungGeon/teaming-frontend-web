import React, { Component } from 'react';
import Chatting from '../containers/Chatting/Chatting';
import Wait from '../primitive/Wait/Wait';
import FixedCenter from '../layouts/FixedCenter/FixedCenter';
import ChatLayout from '../primitive/ChatLayout/ChatLayout';
import Window from '../primitive/Window/Window';
import Button from 'reactstrap/es/Button';
import io from 'socket.io-client';
import { scrollToTop } from '../utils/utils';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      matchComplete: false,
      room: null,
      opponent: null
    };
    this.socket = null;
  }

  componentDidMount() {
    scrollToTop();

    this.socket = io('https://api.tming.kr/chat', {
      transports: ['websocket']
    });

    this.socket.on('HELLO', () => {
      console.log('HELLO');
      this.setState({ connected: true });
    });

    this.socket.on('MATCHED', (room, opponent) => {
      console.log('MATCHED');
      this.setState({ matchComplete: true, room, opponent });
    });

    this.socket.on('OPPONENT_LEFT', () => {
      console.log('OPPONENT_LEFT');
      this.setState({ room: null, opponent: null });
    });
  }

  render() {
    const { matchComplete, room, opponent } = this.state;
    const { history } = this.props;

    const chatting = (
      <Chatting socket={this.socket} room={room} opponent={opponent} />
    );

    return (
      <div>
        {matchComplete ? (
          <ChatLayout chat={chatting}>
            <Window title={'상대방 정보'} foldable>
              <Button color={'primary'} block>
                재매칭
              </Button>
              <Button
                color={'danger'}
                block
                onClick={() => {
                  history.goBack();
                }}
              >
                나가기
              </Button>
              <br />
            </Window>
          </ChatLayout>
        ) : (
          <FixedCenter>
            <Wait msg={'매칭 중 입니다'} />
          </FixedCenter>
        )}
      </div>
    );
  }

  componentWillUnmount() {
    const { room } = this.state;
    if (room) {
      this.socket.emit('CHAT_ENDED', room);
    }
    this.socket.disconnect();
  }
}

export default Chat;
