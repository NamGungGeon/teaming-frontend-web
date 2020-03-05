import React from 'react';
import { getPath } from '../../../utils/url';
import GameList from './GameList';
import { Route } from 'react-router-dom';
import Lol from './lol/Lol';
import Cyphers from './cyphers/Cyphers';
import BattleGround from './battleground/BattleGround';

export default function Match() {
  return (
    <>
      <Route exact path={getPath(`/match`)} component={GameList} />

      <Route path={getPath(`/match/lol`)} component={Lol} />
      <Route path={getPath(`/match/battleground`)} component={BattleGround} />
      <Route path={getPath(`/match/cyphers`)} component={Cyphers} />
    </>
  );
}
