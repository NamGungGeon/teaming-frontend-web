import React, { Component } from 'react';
import Chatting from '../containers/Chatting/Chatting';
import Wait from '../primitive/Wait/Wait';
import ChatLayout from '../layouts/ChatLayout/ChatLayout';
import Window from '../primitive/Window/Window';
import io from 'socket.io-client';
import { pageDescription, scrollToTop } from '../../utils/utils';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import CloseIcon from '@material-ui/icons/Close';
import ReportIcon from '@material-ui/icons/Report';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { getPath } from '../../utils/url';
import PageTitle from '../primitive/PageTitle/PageTitle';
import Floating from '../primitive/Floating/Floating';
import Fab from '@material-ui/core/Fab';
import PersonIcon from '@material-ui/icons/Person';
import { quickConnect } from '../../redux/quick';
import ChatResult from '../containers/ChatResult/ChatResult';

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
    this.socket = io(
      `${
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:4000'
          : 'https://api.tming.kr'
      }/chat`,
      {
        transports: ['websocket']
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
    if (opponent)
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
    const { history, uiKit } = this.props;

    const tools = (
      <div>
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical outlined primary button group"
          fullWidth
        >
          <Button
            startIcon={<RefreshIcon />}
            variant={'contained'}
            color={'primary'}
            onClick={() => {
              this.endChat();
              this.init();
            }}
            fullWidth
          >
            재매칭
          </Button>
          <Button
            startIcon={<ReportIcon />}
            variant={'contained'}
            color={'secondary'}
            fullWidth
            onClick={() => {}}
          >
            신고하기
          </Button>
          <Button
            startIcon={<CloseIcon />}
            variant={'contained'}
            color={'primary'}
            fullWidth
            onClick={() => {
              history.push(getPath('/'));
            }}
          >
            나가기
          </Button>
        </ButtonGroup>
        <br />
        <br />
        <Window title={'상대방 정보'} foldable>
          이곳에 상대방 정보가 표시됩니다
        </Window>
      </div>
    );
    const chatting = (
      <Chatting
        tools={tools}
        socket={this.socket}
        room={room}
        opponent={opponent}
      />
    );

    return (
      <>
        {matchComplete ? (
          <ChatLayout tools={tools} chat={chatting} />
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
