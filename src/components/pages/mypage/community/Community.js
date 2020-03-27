import Block from './Blocks';
import Friends from './Friends';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Message from './Message';
import Notifications from './Notifications';
import Logs from './logs/Logs';

class Community extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <Route exact path={`/mypage/community/blocks`} component={Block} />
        <Route exact path={`/mypage/community/friends`} component={Friends} />
        <Route exact path={`/mypage/community/message`} component={Message} />
        <Route
          exact
          path={`/mypage/community/notifications`}
          component={Notifications}
        />
        <Route path={`/mypage/community/logs`} component={Logs} />
      </div>
    );
  }
}

export default Community;
