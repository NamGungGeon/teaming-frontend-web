import React, { Component } from 'react';
import Chatting from '../../containers/Chatting/Chatting';
import { randStr } from '../../lib/utils';
import Wait from '../../components/Wait/Wait';
import FixedCenter from '../../layouts/FixedCenter/FixedCenter';
import SendBird from 'sendbird';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      channel: undefined
    };

    // TODO: Login with user
    this.userIDs = [];

    this.chatApp = new SendBird({
      appId: '944F75AD-CB74-45F7-B38A-375113891B55'
    });
  }

  async componentDidMount() {
    // TODO: Connect with user (로그인 안되어있는 경우 페이지 접속자체가 안되어야함)
    const user = await this.chatApp.connect('gyukebox');
    const channel = await this.chatApp.OpenChannel.getChannel(
      'teamingSampleOpen'
    );
    await channel.enter();
    this.setState({ user, channel });
  }

  render() {
    const { user, channel } = this.state;
    return (
      <div>
        {user && channel ? (
          <Chatting user={user} channel={channel} />
        ) : (
          <FixedCenter>
            <Wait msg={'매칭 중 입니다'} />
          </FixedCenter>
        )}
      </div>
    );
  }
}

export default Chat;
