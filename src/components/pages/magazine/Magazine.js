import React, {Component} from 'react';
import {getPath} from "../../../utils/url";
import MagazineList from "./MagazineList";
import {Route} from "react-router-dom";
import Read from "../community/Read";

class Magazine extends Component {
  render() {
    return (
      <div>
        <Route exact path={getPath('/magazine')} component={MagazineList}/>
        <Route exact path={getPath('/magazine/:id')} component={Read}/>
      </div>
    );
  }
}

export default Magazine;