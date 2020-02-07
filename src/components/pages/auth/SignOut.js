import React, { Component } from 'react';
import { quickConnect } from '../../../redux/quick';
import { getPath } from '../../../utils/url';

class SignOut extends Component {
  componentDidMount() {
    this.props.AuthDispatcher.logout();
    window.alert('로그아웃 되었습니다');
    this.props.history.push(getPath('/'));
  }

  render() {
    return <div>로그아웃</div>;
  }
}

export default quickConnect(SignOut);
