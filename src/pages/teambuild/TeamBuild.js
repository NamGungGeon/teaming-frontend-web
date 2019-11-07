import React from 'react';
import { getPath } from '../../lib/url';
import GameList from './GameList';
import { Route } from 'react-router-dom';
import Lol from './Lol';
import Builder from './Builder';

export default function TeamBuild({ match }) {
  const { url } = match;
  return (
    <div>
      <Route exact path={getPath(`${url}`)} component={GameList} />
      <Route exact path={getPath(`${url}/lol`)} component={Lol} />
      <Route exact path={getPath(`${url}/lol/build`)} component={Builder} />
    </div>
  );
}
