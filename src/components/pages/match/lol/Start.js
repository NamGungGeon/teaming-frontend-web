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

class Start extends Component {
  constructor(props) {
    super(props);
    this.socket = null;
    this.state = {
      title: '매칭 서버에 접속 중',
      explain: '잠시만 기다려주세요',
      partner: null,
      roomID: null
    };
  }

  componentDidMount() {
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
        explain: `${payload.numPeople}명의 사용자가 접속 중입니다`
      });
      this.socket.emit('PLAYER_INFORMATION_FROM_CLIENT', this.props.playerInfo);
    });

    this.socket.on('START_MATCHING', () => {
      this.setState({
        title: '매칭 시도 중',
        explain: '최적의 파트너를 찾는 중입니다...'
      });
    });

    this.socket.on('LOOKING_FOR_MORE_PEOPLE', () => {
      this.setState({ explain: '더 넓은 가능성을 보고 찾는 중입니다...' });
    });

    this.socket.on('MATCHED', (roomID, partner) => {
      this.setState({ partner, roomID });
    });
  }

  render() {
    const { uiKit } = this.props;
    const { title, explain, partner, roomID } = this.state;
    const chatting = (
      <Chatting socket={this.socket} room={roomID} opponent={partner} />
    );
    const chatLayout = <ChatLayout tools={Tools} chat={chatting} />;
    const isMatched = partner && roomID;
    const chatStatus = (
      <Wait msg={<PageTitle title={title} explain={explain} />} />
    );

    return (
      <>
        {isMatched ? chatLayout : chatStatus}
        <Floating style={{ opacity: 0.8 }} className={'mobile'}>
          <Fab
            onClick={() => {
              uiKit.popup.make(Tools);
            }}
            color="primary"
          >
            <PersonIcon />
          </Fab>
        </Floating>
      </>
    );
  }

  componentWillUnmount() {
    const { uiKit } = this.props;
    const { roomID, partner } = this.state;
    if (roomID && partner) {
      this.socket.emit('CHAT_ENDED', roomID);
    }

    uiKit.popup.make(
      <ChatResult
        close={() => {
          uiKit.popup.destroy();
        }}
      />
    );
    this.socket.disconnect();
  }
}

export default quickConnect(Start);
