import React, {Component} from 'react';
import {getPath} from "../../../utils/url";
import MagazineList from "./MagazineList";
import {Route} from "react-router-dom";
import Read from "../community/Read";
import Write from "../community/Write";

class Magazine extends Component {
  render() {
    return (
      <div>
        <Route exact path={getPath('/magazine')} component={MagazineList}/>
        <Route exact path={getPath('/magazine/read/:id')} component={Read}/>
        <Route exact path={getPath('/magazine/write')} component={Write}/>
      </div>
    );
  }
}

export default Magazine;