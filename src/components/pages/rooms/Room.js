import React, { useEffect, useState } from 'react';
import PageTitle from '../../primitive/PageTitle/PageTitle';
import Chatting from '../../containers/Chatting/Chatting';
import { useParams } from 'react-router-dom';

const Room = ({ socket }) => {
  const { roomId } = useParams();
  const [matched, setMatched] = useState(false);
  const [opponent, setOpponent] = useState(null);
  const [pageTitle, setPageTitle] = useState('상대방 입장을 기다리고 있습니다');
  const [pageDesc, setPageDesc] = useState(
    '상대방이 들어오면 채팅화면으로 넘어갑니다!\n이 페이지를 나갈 시 채팅방이 사라집니다.'
  );

  useEffect(() => {
    socket.current.on('OPPONENT_ENTERED', () => {
      socket.current.emit('MATCH', roomId);
    });

    socket.current.on('MATCHED', userInfo => {
      setMatched(true);
      setOpponent(userInfo);
    });
  });

  const talkInterface = (
    <Chatting socket={socket.current} room={roomId} opponent={opponent} />
  );

  const roomLobby = (
    <div>
      <PageTitle title={pageTitle} explain={pageDesc} />
    </div>
  );

  return matched ? talkInterface : roomLobby;
};

export default Room;
