import React, {Component} from 'react';
import {Route} from "react-router-dom";
import {getPath} from "../../utils/url";
import EventList from "./EventList";
import EventView from "./EventView";

class Events extends Component {
  render() {
    return (
      <div>
        <Route exact path={getPath('/events/')} component={EventList}/>
        <Route exact path={getPath('/events/:id')} component={EventView}/>
      </div>
    );
  }
}

export default Events;