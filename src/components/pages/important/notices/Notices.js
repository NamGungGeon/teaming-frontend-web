import React, {Component} from 'react';
import {getPath} from "../../../../utils/url";
import {Route} from "react-router-dom";
import Notice from "./Notice";
import NoticeList from "./NoticeList";

class Notices extends Component {
  render() {
    return (
      <div>
        <Route exact path={getPath('/important/notices')} component={NoticeList}/>
        <Route exact path={getPath('/important/notices/:id')} component={Notice}/>
      </div>
    );
  }
}

export default Notices;