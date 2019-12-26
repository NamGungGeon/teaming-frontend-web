import React, {Component} from 'react';
import {Route} from "react-router-dom";
import {getPath} from "../../../utils/url";
import EventList from "./EventList";
import EventView from "./EventView";
import Input from "reactstrap/es/Input";
import AlignLayout from "../../../layouts/AlignLayout/AlignLayout";
import Button from "@material-ui/core/Button";
import {createNotice} from "../../../http/tming";
import {errMsg} from "../../../http/util";

class Events extends Component {

  render() {
    return (
      <div>
        <Route exact path={getPath('/important/events/')} component={EventList}/>
        <Route exact path={getPath('/important/events/:id')} component={EventView}/>
      </div>
    );
  }
}

export default Events;