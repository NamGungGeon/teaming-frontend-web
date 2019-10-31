import React, {Component} from 'react';
import Chatting from "../../containers/Chatting/Chatting";
import {randStr} from "../../lib/utils";
import Wait from "../../components/Wait/Wait";
import FixedCenter from "../../layouts/FixedCenter/FixedCenter";

class Chat extends Component {
    state={
        chatId: '',
    };

    componentDidMount() {
        window.setTimeout(()=>{
            this.setState({
               ...this.state,
               chatId: randStr(20),
            });
        }, 1500);
    }

    render() {
        const {chatId}= this.state;
        return (
            <div>
                {
                    chatId?
                        (<Chatting chatId={chatId}/>)
                        :
                        (<FixedCenter><Wait msg={"매칭 중 입니다"}/></FixedCenter>)
                }
            </div>
        );
    }
}

export default Chat;