import React, {Component} from 'react';
import Login from "../../containers/Login/Login";
import {quickConnect} from "../../redux";
import {authorized} from "../../utils/utils";
import {getPath, urlQuery} from "../../utils/url";

class SignIn extends Component {
  componentDidMount() {
    const {auth, history, location, AuthDispatcher}= this.props;

    const query= urlQuery(location);
    const {id, token, refresh }= query;
    if(id && token && refresh){
      AuthDispatcher.login(query);
      return;
    }

    if(authorized(auth))
      history.goBack();
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