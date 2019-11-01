import { bindActionCreators, combineReducers } from 'redux';
import uikit from './uikit';
import auth from './auth';
import router from './router';
import * as Auth from './auth';
import * as UIKit from './uikit';
import * as Router from './router';
import { connect } from 'react-redux';

export default combineReducers({
  uikit,
  auth,
  router
});

export const quickConnect = component => {
  // import uikit from "./uikit"; 는 export default 만 가져오고
  // import * as UIKit from './uikit'; 는 전체 다 가져온다
  // 궁금하면 테스트
  // console.log(uikit);
  // console.log(UIKit);

  const connected = connect(
    state => {
      console.log(state);
      return {
        uiKit: state.uikit,
        auth: state.auth,
        router: state.router
      };
    },
    dispatch => {
      return {
        UIKitDispatcher: bindActionCreators(UIKit, dispatch),
        AuthDispatcher: bindActionCreators(Auth, dispatch),
        RouterDispatcher: bindActionCreators(Router, dispatch)
      };
    },
    null,
    { forwardRef: true }
  )(component);

  return connected;
};
