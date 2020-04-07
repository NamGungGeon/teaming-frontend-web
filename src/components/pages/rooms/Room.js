import React, { useEffect, useState } from 'react';
import PageTitle from '../../primitive/PageTitle/PageTitle';
import Chatting from '../../containers/Chatting/Chatting';

const Room = ({ socket }) => {
  const [matched, setMatched] = useState(false);
  const [opponent, setOpponent] = useState(null);
  const [pageTitle, setPageTitle] = useState('상대방 입장을 기다리고 있습니다');
  const [pageDesc, setPageDesc] = useState(
    '상대방이 들어오면 채팅화면으로 넘어갑니다! 이 페이지를 나갈 시 채팅방이 사라집니다.'
  );

  useEffect(() => {
    console.log(socket);
    socket.current.on('OPPONENT_ENTERED', userInfo => {
      setMatched(true);
      setOpponent(userInfo);
    });
  });

  const talkInterface = <Chatting />;

  const roomLobby = (
    <div>
      <PageTitle title={pageTitle} explain={pageDesc} />
    </div>
  );

  return matched ? <div /> : roomLobby;
};

export default Room;
