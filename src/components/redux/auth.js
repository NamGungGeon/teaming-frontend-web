import { handleActions, createAction } from 'redux-actions';
import { randStr } from '../utils/utils';
import Cookies from 'universal-cookie';

const emailKey = 'asrgawersasfwaerawg';
const tokenKey = 'srghqw4ttq34tqagaga';
const refreshKey= 'agarwrt3qrtrhresadfgawgg';

const cookie = new Cookies();
const initAuth = (newEmail, newToken, newRefresh) => {
  const email = newEmail ? newEmail : cookie.get(emailKey);
  const token = newToken ? newToken : cookie.get(tokenKey);
  const refresh= newRefresh? newRefresh: cookie.get(refreshKey);
  return {
    email, token, refresh
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
      const { email, token, refresh } = action.payload;

      cookie.set(emailKey, email);
      cookie.set(tokenKey, token);
      cookie.set(refreshKey, refresh);

      return initAuth(email, token, refresh);
    },
    [LOGOUT]: () => {
      cookie.set(emailKey, null);
      cookie.set(tokenKey, null);
      cookie.set(refreshKey, null);
      return null;
    }
  },
  user
);
