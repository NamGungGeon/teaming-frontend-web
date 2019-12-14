import React from 'react';
import { getPath } from '../../utils/url';
import GameList from './GameList';
import { Route } from 'react-router-dom';
import Lol from './lol/Lol';

export default function TeamBuild({ match }) {
  return (
    <div>
      <Route exact path={getPath(`/teambuild`)} component={GameList} />
      <Route path={getPath(`/teambuild/lol`)} component={Lol} />
    </div>
  );
}