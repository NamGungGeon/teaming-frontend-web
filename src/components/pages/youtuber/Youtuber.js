import React, { Component } from 'react';
import YoutuberList from './YoutuberList';
import { Route } from 'react-router-dom';

class Youtuber extends Component {
  render() {
    return (
      <div>
        <Route exact path={'/youtuber'} component={YoutuberList} />
        <Route exact path={'/youtuber/:id'} component={YoutuberList} />
      </div>
    );
  }
}

export default Youtuber;
