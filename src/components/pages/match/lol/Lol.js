import React, {Component, useState} from 'react';
import {Route} from "react-router-dom";
import {getPath} from "../../../../utils/url";
import Ready from "./Ready";
import Start from "./Start";

const Lol= ()=> {
  const [match, setMatch]= useState({
    gameType: 'rank',
    tier: '',
    champions: [],
    ban: [],
    likes: [],
    mainPos: '',
    partnerPos: '',
    nickname: '',
    isRank: true,
    mode: 'rank',
    goal: 'win',
  });

  const fulfilled= ()=>{

    return true;
  }

  return (
    <>
      <Route
        exact
        path={getPath(`/match/lol/`)}
        render={(props)=> (
          <Ready
            {...props}
            match={match}
            setMatch={setMatch}
            fulfilled={fulfilled}/>
        )}/>
      <Route
        exact
        path={getPath(`/match/lol/start`)}
        render={(props)=>(
          <Start
            {...props}
            match={match}
            fulfilled={fulfilled}/>
        )}/>
    </>
  );
}

export default Lol;