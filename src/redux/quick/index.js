import {bindActionCreators, combineReducers} from 'redux';

import uiKit, * as UIKit from './uikit';
import auth, * as Auth from './auth';
import config, * as Config from './config';
import sideNav, * as SideNav from "./sidenav";

import {connect} from 'react-redux';

export default combineReducers({
  uiKit,
  auth,
  config,
  sideNav,
});

export const quickConnect = component => {
  // import uikit from "./uikit"; 는 export default 만 가져오고
  // import * as UIKit from './uikit'; 는 전체 다 가져온다
  // 궁금하면 테스트
  // console.log(uikit);
  // console.log(UIKit);

  return connect(
    state => {
      return {
        uiKit: state.uiKit,
        auth: state.auth,
        config: state.config,
        sideNav: state.sideNav,
      };
    },
    dispatch => {
      return {
        UIKitDispatcher: bindActionCreators(UIKit, dispatch),
        AuthDispatcher: bindActionCreators(Auth, dispatch),
        ConfigDispatcher: bindActionCreators(Config, dispatch),
        SideNavDispatcher: bindActionCreators(SideNav, dispatch),
      };
    },
    null,
    {forwardRef: true}
  )(component);
};
