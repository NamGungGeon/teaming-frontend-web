import React from 'react';
import { getPath } from '../../../utils/url';
import GameList from './GameList';
import { Route } from 'react-router-dom';
import Lol from './lol/Lol';

export default function Match ({}){
  return (
    <>
      <Route
        exact
        path={getPath(`/match`)}
        component={GameList}/>
      <Route
        path={getPath(`/match/lol`)}
        component={Lol}/>
    </>
  );
}
