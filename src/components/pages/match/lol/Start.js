import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import Wait from '../../../primitive/Wait/Wait';
import Floating from '../../../primitive/Floating/Floating';
import PageTitle from '../../../primitive/PageTitle/PageTitle';
import Tools from './Tools';
import ChatResult from '../../../containers/ChatResult/ChatResult';
import { quickConnect } from '../../../../redux/quick';
import Chatting from '../../../containers/Chatting/Chatting';
import ChatLayout from '../../../layouts/ChatLayout/ChatLayout';

function Start({ uiKit, playerInfo }) {
  const socket = useRef();
  const [numPeople, setNumPeople] = useState(0);
  const [title, setTitle] = useState('매칭 서버에 접속 중');
  const [explain, setExplain] = useState('잠시만 기다려주세요');
  const [partner, setPartner] = useState(null);
  const [roomID, setRoomID] = useState('');

  useEffect(() => {
    socket.current = io('https://api.tming.kr/match', {
      transports: ['websocket']
    });

    socket.current.on('HELLO', payload => {
      // setConnected(true);
      setNumPeople(payload.numPeople);
      setExplain(`${numPeople}명의 사용자가 접속 중입니다`);

      socket.current.emit('PLAYER_INFORMATION_FROM_CLIENT', playerInfo);
    });

    socket.current.on('START_MATCHING', () => {
      setTitle('매칭 시도 중');
      setExplain('최적의 파트너를 찾는 중입니다...');
    });

    socket.current.on('LOOKING_FOR_MORE_PEOPLE', () => {
      setExplain('더 넓은 가능성을 보고 찾는 중입니다...');
    });

    socket.current.on('MATCHED', (roomID, partner) => {
      setPartner(partner);
      setRoomID(roomID);
    });

    return () => {
      uiKit.popup.make(
        <ChatResult
          close={() => {
            uiKit.popup.destroy();
          }}
        />
      );
      socket.current.disconnect();
    };
  }, [uiKit.popup, playerInfo]);

  const chatting = (
    <Chatting socket={socket.current} room={roomID} opponent={partner} />
  );
  const chatLayout = <ChatLayout tools={Tools} chat={chatting} />;
  const chatStatus = (
    <div>
      <Wait msg={<PageTitle title={title} explain={explain} />} />
      <Floating style={{ opacity: 0.8 }} className={'mobile'} />
    </div>
  );

  return partner && roomID ? chatLayout : chatStatus;
}

export default quickConnect(Start);
