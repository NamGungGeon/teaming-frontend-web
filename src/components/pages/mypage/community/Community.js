import Block from "./Blocks";
import Friends from "./Friends";
import React, {Component} from 'react';
import {getPath} from "../../../utils/url";
import PwChange from "../info/PwChange";
import Route from "react-router-dom/es/Route";
import Message from "./Message";
import PageTitle from "../../../primitive/PageTitle/PageTitle";

class Community extends Component {
  componentDidMount() {
    window.scrollTo(0,0);
  }

  render() {
    return (
      <div>
        <Route exact path={getPath(`/mypage/community/blocks`)} component={Block}/>
        <Route exact path={getPath(`/mypage/community/friends`)} component={Friends}/>
        <Route exact path={getPath(`/mypage/community/message`)} component={Message}/>
      </div>
    );
  }
}

export default Community;