import React, { Component } from 'react';
import MagazineList from './MagazineList';
import { Route } from 'react-router-dom';
import Read from '../community/Read';
import Write from '../community/Write';

class Magazine extends Component {
  render() {
    return (
      <div>
        <Route exact path={'/magazine'} component={MagazineList} />
        <Route exact path={'/magazine/read/:id'} component={Read} />
        <Route exact path={'/magazine/write'} component={Write} />
      </div>
    );
  }
}

export default Magazine;
