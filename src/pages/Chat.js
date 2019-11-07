import React, { Component } from 'react';
import Chatting from '../containers/Chatting/Chatting';
import Wait from '../components/Wait/Wait';
import FixedCenter from '../layouts/FixedCenter/FixedCenter';
import SendBird from 'sendbird';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      channel: undefined
    };

    // TODO: Login with user
    this.userID = 'gyukebox';

    this.chatApp = new SendBird({
      appId: '944F75AD-CB74-45F7-B38A-375113891B55'
    });
    this.chatAppHandler = new this.chatApp.ChannelHandler();
  }

  async componentDidMount() {
    const user = this.chatApp.connect(this.userID);
    const channel = await this.chatApp.OpenChannel.getChannel(
      'teamingSampleOpen'
    );
    await channel.enter();
    this.setState({ user, channel });
  }

  registerHandler = handler => {
    this.chatApp.addChannelHandler('TEAMING_CHAT_HANDLER', handler);
  };

  render() {
    const { user, channel } = this.state;
    return (
      <div>
        {user && channel ? (
          <Chatting
            user={user}
            channel={channel}
            handler={this.chatAppHandler}
            registerHandler={this.registerHandler}
          />
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
