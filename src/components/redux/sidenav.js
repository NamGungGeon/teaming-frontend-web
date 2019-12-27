import { handleActions, createAction } from 'redux-actions';
import { randStr } from '../utils/utils';


const sideNav= {
  content: null,
  visible: false,
};

const SET= randStr(30);
const REMOVE= randStr(30);
const TOGGLE= randStr(30);

export const set = createAction(SET);
export const remove = createAction(REMOVE);
export const toggle= createAction(TOGGLE);

export default handleActions(
  {
    [SET]: (beforeState, action) => {
      return {
        ...beforeState,
        content: action.payload,
        visible: false,
      }
    },
    [REMOVE]: (beforeState,)=>{
      return {
        visible: false,
        content: null,
      }
    },
    [TOGGLE]: (beforeState)=>{
      return {
        ...beforeState,
        visible: !beforeState.visible,
      }
    }
  },
  sideNav,
);
