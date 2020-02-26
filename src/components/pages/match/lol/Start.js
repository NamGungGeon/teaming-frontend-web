import React, { Component } from 'react';
import io from 'socket.io-client';
import Fab from '@material-ui/core/Fab';
import PersonIcon from '@material-ui/icons/Person';
import Wait from '../../../primitive/Wait/Wait';
import Floating from '../../../primitive/Floating/Floating';
import PageTitle from '../../../primitive/PageTitle/PageTitle';
import Tools from './Tools';
import ChatResult from '../../../containers/ChatResult/ChatResult';
import { quickConnect } from '../../../../redux/quick';
import Chatting from '../../../containers/Chatting/Chatting';
import ChatLayout from '../../../layouts/ChatLayout/ChatLayout';
import AlignLayout from '../../../layouts/AlignLayout/AlignLayout';
import { Button } from '@material-ui/core';

class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '매칭 서버에 접속 중',
      explain: '잠시만 기다려주세요',
      partner: null,
      roomID: null,
      lastTime: 30
    };
    this.initState = {
      title: '매칭 서버에 접속 중',
      explain: '잠시만 기다려주세요',
      partner: null,
      roomID: null,
      lastTime: 30
    };
  }
  init = () => {
    this.socket = null;
    this.setState({
      title: '매칭 서버에 접속 중',
      explain: '잠시만 기다려주세요',
      partner: null,
      roomID: null,
      lastTime: 30
    });
    this.socket = io(
      `${
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:4000'
          : 'https://api.tming.kr'
      }/match`,
      {
        transports: ['websocket']
      }
    );

    this.socket.on('HELLO', payload => {
      this.setState({
        ...this.state,
        explain: `${payload.numPeople}명의 사용자가 접속 중입니다`
      });
      this.socket.emit('PLAYER_INFORMATION_FROM_CLIENT', this.props.playerInfo);
    });

    this.socket.on('START_MATCHING', () => {
      this.setState({
        ...this.state,
        title: '매칭 시도 중',
        explain: '최적의 파트너를 찾는 중입니다...'
      });
    });

    this.socket.on('LOOKING_FOR_MORE_PEOPLE', () => {
      this.setState({
        ...this.state,
        explain: '더 넓은 가능성을 보고 찾는 중입니다...'
      });
    });

    this.socket.on('MATCHED', (roomID, partner) => {
      this.setState({ ...this.state, partner, roomID });
      console.log('matched', roomID, partner);
    });

    //timer
    if (this.timer) window.clearInterval(this.timer);
    this.timer = window.setInterval(() => {
      this.setState({
        ...this.state,
        lastTime: this.state.lastTime - 1
      });
    }, 1000);
  };
  componentDidMount() {
    this.init();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { lastTime, partner } = this.state;
    const { history, uiKit } = this.props;

    if (lastTime <= 0 && !partner) {
      uiKit.popup.make(
        <div>
          <h4>죄송합니다. 사용자가 없어 매칭할 수 없습니다</h4>
          <br />
          <AlignLayout align={'right'}>
            <Button
              onClick={() => {
                history.push('/');
                uiKit.popup.destroy();
              }}
              variant={'contained'}
              color={'secondary'}
            >
              홈 화면으로 돌아가기
            </Button>
          </AlignLayout>
        </div>,
        true
      );
    }
  }

  render() {
    const { title, explain, partner, roomID, lastTime } = this.state;
    const refresher = () => {
      this.endChat();
      this.init();
    };
    const chatting = (
      <Chatting
        tools={<Tools refresher={refresher} />}
        socket={this.socket}
        room={roomID}
        opponent={partner}
      />
    );
    const chatLayout = (
      <ChatLayout tools={<Tools refresher={refresher} />} chat={chatting} />
    );
    const isMatched = partner && roomID;
    const chatStatus = (
      <Wait
        msg={
          <PageTitle
            title={title}
            explain={
              lastTime > 0 ? (
                <div>
                  {explain}
                  <br />
                  남은 시간 {lastTime}초
                </div>
              ) : (
                '매칭 실패'
              )
            }
          />
        }
      />
    );

    return <>{isMatched ? chatLayout : chatStatus}</>;
  }
  endChat = () => {
    const { uiKit, auth } = this.props;
    const { roomID, partner } = this.state;
    if (roomID && partner) {
      this.socket.emit('CHAT_ENDED', roomID);
      if (auth) {
        uiKit.popup.make(
          <ChatResult
            close={() => {
              uiKit.popup.destroy();
            }}
          />
        );
      }
    }

    this.socket.disconnect();
  };
  componentWillUnmount() {
    this.endChat();
  }
}

export default quickConnect(Start);
