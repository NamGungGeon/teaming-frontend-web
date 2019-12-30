import React, {Component} from 'react';
import Login from "../../containers/Login/Login";
import {quickConnect} from "../../redux";
import {authorized} from "../../utils/utils";
import {getPath, urlQuery} from "../../utils/url";

class SignIn extends Component {
  componentDidMount() {
    const{auth, history}= this.props;

    if(authorized(auth))
      history.push(getPath(`/`));
  }

  render() {
    return (
      <div>
        <Login history={this.props.history}/>
      </div>
    );
  }
}

export default quickConnect(SignIn);