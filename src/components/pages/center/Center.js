import React, { Component } from 'react';
import { getPath } from '../../../utils/url';
import CenterHome from './CenterHome';
import { Route } from 'react-router-dom';
import CreateCase from './CreateCase';

class Center extends Component {
  render() {
    return (
      <div>
        <Route exact path={getPath('/center')} component={CenterHome} />
        <Route exact path={getPath('/center/create')} component={CreateCase} />
      </div>
    );
  }
}

export default Center;
