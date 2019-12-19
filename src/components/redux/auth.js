import { handleActions, createAction } from 'redux-actions';
import { randStr } from '../utils/utils';
import Cookies from 'universal-cookie';

const emailKey = 'asrgawersasfwaerawg';
const tokenKey = 'srghqw4ttq34tqagaga';
const refreshKey= 'agarwrt3qrtrhresadfgawgg';
const idKey= '34tw5ehyes5tushe';

const cookie = new Cookies();
const initAuth = ( newToken, newRefresh, newId) => {
  const token = newToken ? newToken : cookie.get(tokenKey);
  const refresh= newRefresh? newRefresh: cookie.get(refreshKey);
  const id= newId? newId: cookie.get(idKey);
  return {
    token, refresh,id
  };
};
const user = initAuth();

const LOGIN = randStr(30);
const LOGOUT = randStr(30);

export const login = createAction(LOGIN);
export const logout = createAction(LOGOUT);

export default handleActions(
  {
    [LOGIN]: (beforeAuth, action) => {
      const { token, refresh, id } = action.payload;

      cookie.set(tokenKey, token);
      cookie.set(refreshKey, refresh);
      cookie.set(idKey, id);

      console.log(token, refresh, id);

      return initAuth(token, refresh, id);
    },
    [LOGOUT]: () => {
      cookie.set(tokenKey, null);
      cookie.set(refreshKey, null);
      cookie.set(idKey, null);
      return null;
    }
  },
  user
);
