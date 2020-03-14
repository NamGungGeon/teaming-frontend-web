import React, { Component } from 'react';
import Chatting from '../containers/Chatting/Chatting';
import Wait from '../primitive/Wait/Wait';
import ChatLayout from '../layouts/ChatLayout/ChatLayout';
import io from 'socket.io-client';
import { authorized, pageDescription, scrollToTop } from '../../utils/utils';
import PageTitle from '../primitive/PageTitle/PageTitle';
import { quickConnect } from '../../redux/quick';
import ChatResult from '../containers/ChatResult/ChatResult';
import ChattingTool from '../primitive/ChattingTool/ChattingTool';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = this.initState;
    this.socket = null;
  }

  initState = {
    connected: false,
    matchComplete: false,
    room: null,
    opponent: null,
    numPeople: 0
  };

  //using when request re-matching
  init = () => {
    this.setState({
      ...this.initState
    });
    this.startChat();
  };

  componentDidMount() {
    pageDescription('티밍: 랜덤채팅', '과연 누구를 만날까요?!');
    scrollToTop();
    this.init();
  }

  chatStatus = () => {
    const { connected, numPeople } = this.state;
    const title = connected ? '매칭 대기 중' : '채팅 서버에 접속 중';
    const explain = connected
      ? `${numPeople}명의 유저가 채팅 중 입니다`
      : `잠시만 기다려주세요`;

    return <Wait msg={<PageTitle title={title} explain={explain} />} />;
  };

  startChat = () => {
    const { auth } = this.props;
    const token = auth.hasOwnProperty('token') ? auth.token : null;

    this.socket = io(
      `${
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:4000'
          : 'https://api.tming.kr'
      }/chat`,
      {
        transports: ['websocket'],
        query: { access: token }
      }
    );

    this.socket.on('connect_error', error => {
      console.error(error);
    });

    this.socket.on('HELLO', payload => {
      console.log('HELLO', payload);
      this.setState({
        ...this.state,
        numPeople: payload.numPeople,
        connected: true
      });
    });

    this.socket.on('MATCHED', (room, opponent) => {
      this.unblock = this.props.history.block(
        '이 페이지를 나가면 상대와 연결이 끊어집니다'
      );
      console.log('MATCHED');
      this.setState({
        ...this.state,
        matchComplete: true,
        room,
        opponent
      });
    });

    this.socket.on('OPPONENT_LEFT', () => {
      console.log('OPPONENT_LEFT');
      this.endChat();
    });
  };

  endChat = () => {
    const { uiKit, auth } = this.props;
    const { room, opponent } = this.state;

    console.log(opponent);
    if (opponent && authorized(auth))
      uiKit.popup.make(
        <ChatResult
          auth={auth}
          opponent={opponent.slice()}
          close={() => {
            uiKit.popup.destroy();
          }}
        />
      );
    if (room) {
      this.socket.emit('CHAT_ENDED', room);
    }
    if (this.socket) {
      this.socket.disconnect();
      this.setState({
        ...this.state,
        room: null,
        opponent: null
      });
    }
  };

  render() {
    const { matchComplete, room, opponent } = this.state;
    const { uiKit } = this.props;
    const chatTool = (
      <ChattingTool
        uiKit={uiKit}
        rematching={() => {
          this.endChat();
          this.init();
        }}
      />
    );
    const chatting = (
      <Chatting
        tools={chatTool}
        socket={this.socket}
        room={room}
        opponent={opponent}
      />
    );

    return (
      <>
        {matchComplete ? (
          <ChatLayout tools={chatTool} chat={chatting} />
        ) : (
          this.chatStatus()
        )}
      </>
    );
  }

  componentWillUnmount() {
    if (this.unblock) {
      this.unblock();
    }

    this.endChat();
    pageDescription();
  }
}

export default quickConnect(Chat);
