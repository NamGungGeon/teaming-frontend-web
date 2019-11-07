import React, { Component } from 'react';
import PolaroidsZone from './PolaroidsZone';
import { Route } from 'react-router-dom';
import { getPath } from '../../lib/url';
import List from './List';
import Login from './Login';
import UIKitZone from './UIKitZone';
import NotDev from './NotDev';
import Shape from './Shape';
import Windows from './Windows';

class Sample extends Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        <Route exact path={getPath(`${match.url}/`)} component={List} />
        <Route
          exact
          path={getPath(`${match.url}/polaroids`)}
          component={PolaroidsZone}
        />
        <Route exact path={getPath(`${match.url}/login`)} component={Login} />
        <Route
          exact
          path={getPath(`${match.url}/uikit`)}
          component={UIKitZone}
        />
        <Route exact path={getPath(`${match.url}/deving`)} component={NotDev} />
        <Route exact path={getPath(`${match.url}/shape`)} component={Shape} />
        <Route
          exact
          path={getPath(`${match.url}/windows`)}
          component={Windows}
        />
      </div>
    );
  }
}

export default Sample;
