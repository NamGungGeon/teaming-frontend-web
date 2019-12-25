import { handleActions, createAction } from 'redux-actions';
import { randStr } from '../utils/utils';


const defaultConfig= {
  hideNav: false,
};

const HIDE_NAV= randStr(30);

export const hideNav = createAction(HIDE_NAV);

export default handleActions(
  {
    [HIDE_NAV]: (beforeState, action) => {
      beforeState.hideNav= true;
      return defaultConfig;
    },
  },
  defaultConfig
);
