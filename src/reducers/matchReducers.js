import { SELECT_CHAMPION } from '../actions/match/lol/actions';

const initialState = {
  category: 'LOL',
  status: 'PREPARING',
  details: {
    username: '씨맥',
    mode: 'RANK',
    tier: 'PLATINUM',
    goal: 'free',
    lanes: {
      main: 'top',
      sub: 'jungle',
      partnerWish: 'support'
    },
    champions: {
      mySelect: [],
      partnerWish: [],
      partnerExclude: []
    }
  }
};

export default function matchReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_CHAMPION:
      return {
        ...state,
        champions: {
          ...state.champions,
          [action.selectionType]: action.champion
        }
      };
    default:
      return state;
  }
}
