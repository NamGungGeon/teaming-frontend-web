import React, { Component } from 'react';
import FAQ from './FAQ';
import { Route } from 'react-router-dom';
import CreateCase from './CreateCase';

class Center extends Component {
  render() {
    return (
      <div>
        <Route exact path={'/center'} component={FAQ} />
        <Route exact path={'/center/create'} component={CreateCase} />
      </div>
    );
  }
}

export default Center;
