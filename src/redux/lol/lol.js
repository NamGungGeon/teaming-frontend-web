import { handleActions, createAction } from 'redux-actions';
import {randStr} from "../../utils/utils";

const initState= {
  match: {
    gameType: 'rank',
    tier: '',
    champions: [],
    ban: [],
    likes: [],
    mainPos: '',
    nickname: '',
    isRank: true,
    mode: 'rank',
    goal: 'win',
  },
};

const MATCH= randStr();

export const match= createAction(MATCH);

export default handleActions({
  [MATCH]: (state, action)=>{
    const match= action.payload;
    return {
      ...state,
      match,
    }
  },
}, initState);