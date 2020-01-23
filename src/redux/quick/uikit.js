import { handleActions, createAction } from 'redux-actions';
import { randStr } from '../../utils/utils';

//initial state is null
//must initiate in [ROOT].js
const uiBundle = null;

const INIT = randStr(30);

export const init = createAction(INIT);

export default handleActions(
  {
    [INIT]: (bundle, action) => {
      if (!action.payload)
        throw new Error(
          'uiBundle init is fail since passed payload is null (redux/uikit.js)'
        );

      return action.payload;
    }
  },
  uiBundle
);
