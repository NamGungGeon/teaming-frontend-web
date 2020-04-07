import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import RoomList from './RoomList';
import { Route } from 'react-router-dom';
import Room from './Room';
import { quickConnect } from '../../../redux/quick';

const Rooms = ({ auth, history, uiKit }) => {
  const socket = useRef();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    const token = auth.hasOwnProperty('token') ? auth.token : null;

    socket.current = io(
      `${
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:4000'
          : 'https://api.tming.kr'
      }/chatroom`,
      {
        transports: ['websocket'],
        query: { access: token }
      }
    );

    socket.current.on('JOINED_LOBBY', initialRooms => {
      setRooms(initialRooms);
    });

    socket.current.on('ROOMS_LIST_UPDATED', updatedRooms => {
      setRooms(updatedRooms);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [auth]);

  const handleCreateRoom = title => {
    socket.current.emit('CREATE_ROOM', title);
    socket.current.on('ROOM_CREATED', roomInfo => {
      uiKit.popup.destroy();
      history.push(`/rooms/${roomInfo.id}`);
    });
  };

  const handleJoinRoom = roomID => {
    socket.current.emit('JOIN_ROOM', roomID);
  };

  return (
    <>
      <Route
        exact
        path="/rooms"
        render={() => (
          <RoomList
            rooms={rooms}
            onCreate={handleCreateRoom}
            onJoin={handleJoinRoom}
          />
        )}
      />
      <Route
        exact
        path="/rooms/:roomId"
        render={() => <Room socket={socket} />}
      />
    </>
  );
};

export default quickConnect(Rooms);
