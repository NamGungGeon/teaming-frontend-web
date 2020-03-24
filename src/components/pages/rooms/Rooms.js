import React, { useEffect } from 'react';
import Section from '../../primitive/Section/Section';
import PageTitle from '../../primitive/PageTitle/PageTitle';
import RoomList from './RoomList';
import { Route } from 'react-router-dom';
import Room from './Room';

const Rooms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <Route exact path={`/rooms`} component={RoomList} />
      <Route exact path={`/rooms/:roomId`} component={Room} />
    </>
  );
};

export default Rooms;
