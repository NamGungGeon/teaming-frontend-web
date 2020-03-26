import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SignUp from './SignUp';
import Lost from './Lost';
import SignOut from './SignOut';
import Signin from './Signin';

class Auth extends Component {
  render() {
    return (
      <div>
        <Route exact path={'/auth/signin'} component={Signin} />
        <Route exact path={'/auth/signout'} component={SignOut} />
        <Route exact path={'/auth/signup'} component={SignUp} />
        <Route exact path={'/auth/lost'} component={Lost} />
      </div>
    );
  }
}

export default Auth;
