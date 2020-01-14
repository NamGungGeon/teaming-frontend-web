import React, { Component } from 'react';
import Chatting from '../containers/Chatting/Chatting';
import Wait from '../primitive/Wait/Wait';
import ChatLayout from '../primitive/ChatLayout/ChatLayout';
import Window from '../primitive/Window/Window';
import io from 'socket.io-client';
import { scrollToTop } from '../utils/utils';
import Button from "@material-ui/core/Button";
import RefreshIcon from '@material-ui/icons/Refresh';
import CloseIcon from '@material-ui/icons/Close';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ReportIcon from '@material-ui/icons/Report';
import {getPath} from "../utils/url";
import PageTitle from "../primitive/PageTitle/PageTitle";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = this.initState;
    this.socket = null;
  }

  initState= {
    connected: false,
    matchComplete: false,
    room: null,
    opponent: null,
    numPeople: 0,
  };

  //using when request re-matching
  init= ()=>{
    this.setState({
      ...this.initState,
    });
    this.startChat();
  };

  componentDidMount() {
    scrollToTop();
    this.init();
  }

  startChat= ()=>{
    this.socket = io('https://api.tming.kr/chat', {
      transports: ['websocket']
    });

    this.socket.on('HELLO', (payload) => {
      console.log('HELLO', payload);
      this.setState({
        ...this.state,
        numPeople: payload.numPeople,
        connected: true,
      });
    });

    this.socket.on('MATCHED', (room, opponent) => {
      console.log('MATCHED');
      this.setState({
        ...this.state,
        matchComplete: true, room, opponent
      });
    });

    this.socket.on('OPPONENT_LEFT', () => {
      console.log('OPPONENT_LEFT');
      this.setState({
        ...this.state,
        room: null, opponent: null
      });
      this.endChat();
    });
  };

  endChat= ()=>{
    const { room } = this.state;
    if (room) {
      this.socket.emit('CHAT_ENDED', room);
    }
    this.socket.disconnect();
  };

  render() {
    const { matchComplete, room, opponent, numPeople } = this.state;
    const { history } = this.props;

    const chatting = (
      <Chatting socket={this.socket} room={room} opponent={opponent} />
    );
    const tools= (
      <div>
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical outlined primary button group"
          fullWidth
        >
          <Button
            startIcon={<RefreshIcon/>}
            variant={'contained'}
            color={'primary'}
            onClick={() => {
              this.endChat();
              this.init();
            }}
            fullWidth>
            재매칭
          </Button>
          <Button
            startIcon={<ReportIcon/>}
            variant={'contained'}
            color={'secondary'}
            fullWidth
            onClick={() => {
            }}
          >
            신고하기
          </Button>
          <Button
            startIcon={<CloseIcon/>}
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
        <br/><br/>
        <Window title={'상대방 정보'} foldable>
          ㅔㅔㅔㅔㅔㅔ
        </Window>
      </div>
    );

    return (
      <div>
        {matchComplete ? (
          <ChatLayout
            tools={tools}
            chat={chatting}>
            {tools}
          </ChatLayout>
        ) : (
          <Wait
            msg={(
              <PageTitle
                title={'매칭 대기 중'}
                explain={`현재 ${numPeople}명이 채팅 중 입니다`}/>
            )}/>
        )}
      </div>
    );
  }

  componentWillUnmount() {
    this.endChat();
  }
}

export default Chat;
