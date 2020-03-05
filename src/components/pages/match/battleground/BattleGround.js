import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import Ready from './Ready';
import Start from './Start';

const BattleGround = props => {
  const [playerInfo, setPlayerInfo] = useState({
    tier: '',
    partnerGender: 'all',
    mode: 'rank',
    goal: 'win',
    nickname: ''
  });
  return (
    <>
      <Route
        exact
        path={'/match/battleground/'}
        render={props => {
          return (
            <Ready
              playerInfo={playerInfo}
              setPlayerInfo={setPlayerInfo}
              {...props}
            />
          );
        }}
      />
      <Route
        exact
        path={'match/battleground/start/'}
        render={props => {
          return <Start playerInfo={playerInfo} {...props} />;
        }}
      />
    </>
  );
};
export default BattleGround;
