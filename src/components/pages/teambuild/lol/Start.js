import React, { Component } from 'react';
import Wait from '../../../primitive/Wait/Wait';
import FixedCenter from "../../../layouts/FixedCenter/FixedCenter";
import Chatting from "../../../containers/Chatting/Chatting";
import SendBird from "sendbird";
import ChatLayout from "../../../primitive/ChatLayout/ChatLayout";
import ImageViewGroup from "../../../containers/ImageViewGroup/ImageViewGroup";
import Window from "../../../primitive/Window/Window";
import Button from "reactstrap/es/Button";
import {resPath} from "../../../utils/url";

class Start extends Component {

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
        {
          user && channel?
            (<ChatLayout
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

                  <h5>닉네임</h5>
                  <p>인간조무사남궁건</p>
                  <h5>티어</h5>
                  <p>
                    <img src={`${resPath}/lol/tier/silver.png`} width={'64px'}/>
                    Silver 1st
                  </p>
                  <h5>선호 챔피언</h5>
                  <p>
                    <ImageViewGroup style={{justifyContent: 'flex-start'}} icons={[
                      {img: `${resPath}/lol/champions/Ahri.png`},
                      {img: `${resPath}/lol/champions/Ahri.png`},
                      {img: `${resPath}/lol/champions/Ahri.png`},
                      {img: `${resPath}/lol/champions/Ahri.png`},
                    ]}/>
                  </p>
                  <h5>밴 챔피언</h5>
                  <p>
                    <ImageViewGroup style={{justifyContent: 'flex-start'}} icons={[
                      {img: `${resPath}/lol/champions/Ahri.png`},
                      {img: `${resPath}/lol/champions/Ahri.png`},
                      {img: `${resPath}/lol/champions/Ahri.png`},
                      {img: `${resPath}/lol/champions/Ahri.png`},
                    ]}/>
                  </p>
                </Window>
            </ChatLayout>)
            :
            (<FixedCenter>
              <Wait msg={'팀 빌딩 중입니다'} />
            </FixedCenter>)
        }
      </div>
    );
  }
}

export default Start;
