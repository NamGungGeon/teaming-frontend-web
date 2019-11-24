import React, { Component } from 'react';
import Chatting from '../containers/Chatting/Chatting';
import Wait from '../primitive/Wait/Wait';
import FixedCenter from '../layouts/FixedCenter/FixedCenter';
import SendBird from 'sendbird';
import ChatLayout from "../primitive/ChatLayout/ChatLayout";
import Window from "../primitive/Window/Window";
import Button from "reactstrap/es/Button";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      channel: undefined
    };

    // TODO: Auth with user
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
    const {history}= this.props;

    const chatting=
      (<Chatting
        user={user}
        channel={channel}
        handler={this.chatAppHandler}
        registerHandler={this.registerHandler}/>);

    return (
      <div>
        {user && channel ? (
          <ChatLayout
            chat={chatting}>
            <Window title={'상대방 정보'} foldable>
              <Button color={'primary'} block>재매칭</Button>
              <Button
                color={'danger'}
                block
                onClick={()=>{
                  history.goBack();
                }}>
                나가기
              </Button>
              <br/>
            </Window>
            </ChatLayout>
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
