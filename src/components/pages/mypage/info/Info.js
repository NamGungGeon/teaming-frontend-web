import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MyInfo from './MyInfo';
import PwChange from './PwChange';
import Escape from './Escape';

class Info extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div>
        <Route exact path={`/mypage/info`} component={MyInfo} />
        <Route exact path={`/mypage/info/change/pw`} component={PwChange} />
        <Route exact path={`/mypage/info/escape`} component={Escape} />
      </div>
    );
  }
}

export default Info;
