import React, { Component } from 'react';
import Asked from './Asked';
import { Route } from 'react-router-dom';
import Illegal from './Illegal';
import CreateCase from '../../center/CreateCase';

class Service extends Component {
  componentDidMount() {
    console.log('welcome!');
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div>
        <Route exact path={`/mypage/service/asked`} component={Asked} />
        <Route exact path={`/mypage/service/asking`} component={CreateCase} />
        <Route exact path={`/mypage/service/illegal`} component={Illegal} />
      </div>
    );
  }
}

export default Service;
