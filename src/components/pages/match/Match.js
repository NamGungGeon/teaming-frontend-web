import React from 'react';
import GameList from './GameList';
import { Route } from 'react-router-dom';
import Lol from './lol/Lol';
import Cyphers from './cyphers/Cyphers';
import BattleGround from './battleground/BattleGround';

export default function Match() {
  return (
    <>
      <Route exact path={`/match`} component={GameList} />

      <Route path={`/match/lol`} component={Lol} />
      <Route path={`/match/battleground`} component={BattleGround} />
      <Route path={`/match/cyphers`} component={Cyphers} />
    </>
  );
}
