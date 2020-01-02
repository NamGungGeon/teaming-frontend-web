import React, {Component} from 'react';
import {getPath} from "../../../utils/url";
import Asked from "./Asked";
import {Route} from "react-router-dom";
import Illegal from "./Illegal";
import Asking from "./Asking";

class Service extends Component {
  componentDidMount() {
    console.log('welcome!')
    window.scrollTo(0,0);
  }
  render() {
    return (
      <div>
        <Route exact path={getPath(`/mypage/service/asked`)} component={Asked}/>
        <Route exact path={getPath(`/mypage/service/asking`)} component={Asking}/>
        <Route exact path={getPath(`/mypage/service/illegal`)} component={Illegal}/>
      </div>
    );
  }
}

export default Service;