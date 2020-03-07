import React, { useState } from 'react';
import { getPath } from '../../../../utils/url';
import { Route } from 'react-router-dom';
import Ready from './Ready';
import Start from './Start';

const Cyphers = () => {
  const [playerInfo, setPlayerInfo] = useState({
    tier: '',
    champions: [],
    ban: [],
    likes: [],
    mainPos: 'tanker',
    partnerPos: 'tanker',
    partnerGender: 'all',
    nickname: '',
    mode: 'rank',
    goal: 'win'
  });
  return (
    <>
      <Route
        exact
        path={getPath(`/match/cyphers/`)}
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
        path={getPath(`/match/cyphers/start`)}
        render={props => <Start {...props} playerInfo={playerInfo} />}
      />
    </>
  );
};

export default Cyphers;
