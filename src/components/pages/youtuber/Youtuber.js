import React, {Component} from 'react';
import {getPath} from "../../../utils/url";
import YoutuberList from "./YoutuberList";
import {Route} from "react-router-dom";

class Youtuber extends Component {
  render() {
    return (
      <div>
        <Route exact path={getPath('/youtuber')} component={YoutuberList}/>
        <Route exact path={getPath('/youtuber/:id')} component={YoutuberList}/>
      </div>
    );
  }
}

export default Youtuber;