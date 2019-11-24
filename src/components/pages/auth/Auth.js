import React, {Component} from 'react';
import {getPath} from "../../utils/url";
import SignIn from "./SignIn";
import {Route} from "react-router-dom";
import SignUp from "./SignUp";
import Lost from "./Lost";

class Auth extends Component {
  render() {
    return (
      <div>
        <Route exact path={getPath('/auth/signin')} component={SignIn}/>
        <Route exact path={getPath('/auth/signup')} component={SignUp}/>
        <Route exact path={getPath('/auth/lost')} component={Lost}/>
      </div>
    );
  }
}

export default Auth;