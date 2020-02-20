import React, { Component } from 'react';
import { getPath } from '../../../utils/url';
import { Route } from 'react-router-dom';
import SignUp from './SignUp';
import Lost from './Lost';
import SignOut from './SignOut';

class Auth extends Component {
  render() {
    return (
      <div>
        <Route exact path={getPath('/auth/signup')} component={SignUp} />
        <Route exact path={getPath('/auth/signout')} component={SignOut} />
        <Route exact path={getPath('/auth/lost')} component={Lost} />
      </div>
    );
  }
}

export default Auth;
