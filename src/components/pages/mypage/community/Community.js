import Shield from "./Shield";
import Friends from "./Friends";
import React, {Component} from 'react';
import {getPath} from "../../../utils/url";
import PwChange from "../info/PwChange";
import Route from "react-router-dom/es/Route";
import Message from "./Message";

class Community extends Component {
  render() {
    return (
      <div>
        <Route exact path={getPath(`/mypage/community/shield`)} component={Shield}/>
        <Route exact path={getPath(`/mypage/community/friends`)} component={Friends}/>
        <Route exact path={getPath(`/mypage/community/message`)} component={Message}/>
      </div>
    );
  }
}

export default Community;