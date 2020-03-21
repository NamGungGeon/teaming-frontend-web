import React, { useEffect } from 'react';
import { quickConnect } from '../../../redux/quick';

const SignOut = ({ AuthDispatcher, history, auth }) => {
  useEffect(() => {
    AuthDispatcher.logout();
    window.alert('로그아웃 되었습니다');
    history.push('/');

    window.auth = auth;
  });

  return <div />;
};

export default quickConnect(SignOut);
