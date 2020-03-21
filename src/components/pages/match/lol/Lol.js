import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import Ready from './Ready';
import Start from './Start';

const Lol = () => {
  const [playerInfo, setPlayerInfo] = useState({
    tier: '',
    champions: [],
    ban: [],
    likes: [],
    mainPos: '',
    partnerPos: '',
    partnerGender: 'all',
    nickname: '',
    mode: 'rank',
    goal: 'win'
  });

  return (
    <>
      <Route
        exact
        path={`/match/lol/`}
        render={props => (
          <Ready
            {...props}
            playerInfo={playerInfo}
            setPlayerInfo={setPlayerInfo}
          />
        )}
      />
      <Route
        exact
        path={`/match/lol/start`}
        render={props => <Start {...props} playerInfo={playerInfo} />}
      />
    </>
  );
};

export default Lol;
