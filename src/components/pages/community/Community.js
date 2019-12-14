import React, {Component} from 'react';
import {getPath} from "../../utils/url";
import Option from "../teambuild/lol/Option";
import Start from "../teambuild/lol/Start";
import Route from "react-router-dom/es/Route";
import Category from "./Category";

class Community extends Component {
  render() {
    return (
      <div>
        <Route exact path={getPath(`/community/`)} component={Category}/>
      </div>
    );
  }
}

export default Community;