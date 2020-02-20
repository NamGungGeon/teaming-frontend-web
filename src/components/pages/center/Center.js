import React, { Component } from 'react';
import { getPath } from '../../../utils/url';
import FAQ from './FAQ';
import { Route } from 'react-router-dom';
import CreateCase from './CreateCase';

class Center extends Component {
  render() {
    return (
      <div>
        <Route exact path={getPath('/center')} component={FAQ} />
        <Route exact path={getPath('/center/create')} component={CreateCase} />
      </div>
    );
  }
}

export default Center;
