import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import EventList from './EventList';
import Event from './Event';

class Events extends Component {
  render() {
    return (
      <>
        <Route exact path={'/important/events/'} component={EventList} />
        <Route exact path={'/important/events/:id'} component={Event} />
      </>
    );
  }
}

export default Events;
