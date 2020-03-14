import React, { useEffect } from 'react';
import { quickConnect } from '../../../redux/quick';
import { getPath } from '../../../utils/url';

const SignOut = ({ AuthDispatcher, history, auth }) => {
  useEffect(() => {
    AuthDispatcher.logout();
    window.alert('로그아웃 되었습니다');
    history.push(getPath('/'));

    window.auth = auth;
  });

  return <div />;
};

export default quickConnect(SignOut);
