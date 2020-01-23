import { handleActions, createAction } from 'redux-actions';
import { randStr } from '../../utils/utils';


const defaultConfig= {
  hideNav: false,
  imapp: false,
};

const HIDE_NAV= randStr(30);
const IM_APP= randStr(30);

export const hideNav = createAction(HIDE_NAV);
export const imapp= createAction(IM_APP);

export default handleActions(
  {
    [HIDE_NAV]: (beforeState, action) => {
      return {
        ...beforeState,
        hideNav: true,
      };
    },
    [IM_APP]: (beforeState, action) => {
      return {
        ...beforeState,
        imapp: true,
      }
    },
  },
  defaultConfig
);
