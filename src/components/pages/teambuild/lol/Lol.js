import React, {Component} from 'react';
import {Route} from "react-router-dom";
import {getPath} from "../../../utils/url";
import Option from "./Option";
import Start from "./Start";

class Lol extends Component {
  componentDidMount() {
    this.props.stepping(1);
    window.scrollTo(0,0);
  }
  render() {
    return (
      <div>
        <Route exact path={getPath(`/teambuild/lol/`)} component={Option}/>
        <Route exact path={getPath(`/teambuild/lol/starttt`)} component={Start}/>
      </div>
    );
  }
}

export default Lol;