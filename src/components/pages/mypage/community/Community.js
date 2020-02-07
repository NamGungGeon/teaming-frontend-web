import Block from './Blocks';
import Friends from './Friends';
import React, { Component } from 'react';
import { getPath } from '../../../../utils/url';
import { Route } from 'react-router-dom';
import Message from './Message';
import Notifications from './Notifications';

class Community extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <Route
          exact
          path={getPath(`/mypage/community/blocks`)}
          component={Block}
        />
        <Route
          exact
          path={getPath(`/mypage/community/friends`)}
          component={Friends}
        />
        <Route
          exact
          path={getPath(`/mypage/community/message`)}
          component={Message}
        />
        <Route
          exact
          path={getPath(`/mypage/community/notifications`)}
          component={Notifications}
        />
        {/*<Route path={getPath(`/mypage/community/logs`)} component={Logs}/>*/}
      </div>
    );
  }
}

export default Community;
