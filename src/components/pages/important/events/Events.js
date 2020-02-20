import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { getPath } from '../../../../utils/url';
import EventList from './EventList';
import Event from './Event';

class Events extends Component {
  render() {
    return (
      <>
        <Route
          exact
          path={getPath('/important/events/')}
          component={EventList}
        />
        <Route
          exact
          path={getPath('/important/events/:id')}
          component={Event}
        />
      </>
    );
  }
}

export default Events;
