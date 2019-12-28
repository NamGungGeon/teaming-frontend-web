import React, {Component} from 'react';
import AlignLayout from '../layouts/AlignLayout/AlignLayout';

import SquareButton from '../primitive/SquareButton/SquareButton';
import {getPath, urlQuery} from '../utils/url';
import logo from '../resource/icon.png';
import people from '../resource/icon/people.png';
import UsefulInformation from "../containers/UsefulInformation/UsefulInformation";
import Logo from "../primitive/Logo/Logo";
import ButtonsWrapper from "../primitive/ButtonsWrapper/ButtonsWrapper";
import {quickConnect} from "../redux";
import HelpAppInstall from "../containers/HelpAppInstall/HelpAppInstall";
import HorizontalNavigation from "../containers/Navigation/HorizontalNavigation";

import GamepadIcon from '@material-ui/icons/Gamepad';
import PeopleIcon from '@material-ui/icons/People';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import ChatIcon from '@material-ui/icons/Chat';
import { IoIosHeart, } from "react-icons/io";
import { FaToiletPaper } from "react-icons/fa";
import GoogleAdvertise from "../containers/GoogleAdvertise/GoogleAdvertise";

class Home extends Component{

  componentDidMount() {
    const {AuthDispatcher, location, history}= this.props;
    //check auth query
    const query= urlQuery(location);

    const {id, token, refresh }= query;
    if(id && token && refresh){
      AuthDispatcher.login(query);
    }
    //end check

    window.scrollTo(0,0);
  }

  render() {
    const {history, location}= this.props;

    const go = path => {
      history.push(path);
    };

    return (
      <AlignLayout align="center">
        {
          !urlQuery(location).imapp && (<HelpAppInstall/>)
        }
        <Logo/>
        <UsefulInformation
          history={history}/>
        <br/><br/>
        <GoogleAdvertise/>
        <br/><br/>
        <div className={'mobile'}>
          <ButtonsWrapper
            buttons={[
              (<SquareButton
                style={{backgroundColor: '#fc0474'}}
                onClick={() => {
                  go(getPath(`/teambuild`));
                }}
                icon={people}
                label={'팀 매칭'}
              />),
              (<SquareButton
                style={{backgroundColor: '#2ab3fe'}}
                onClick={() => {
                  go(getPath(`/chat`));
                }}
                icon={logo}
                label={'랜덤채팅'}
              />),
              (<SquareButton
                style={{backgroundColor: '#fc0474'}}
                icon={logo}
                label={'커뮤니티'}
                onClick={()=>{
                  go(getPath(`/community`));
                }}
              />),
              (<SquareButton
                style={{backgroundColor: '#2ab3fe'}}
                icon={logo}
                onClick={()=>{
                  go(getPath(`/trash`))
                }}
                label={'화장실'}
              />),
              (<SquareButton
                style={{backgroundColor: '#fc0474'}}
                icon={logo}
                label={'거래소'}
                onClick={()=>{
                  go(getPath(`/trade`))
                }}
              />),
              (<SquareButton
                icon={logo}
                style={{backgroundColor: '#2ab3fe'}}
                label={'커플 매칭'}
                onClick={()=>{

                }}
              />)
            ]}
          />

        </div>
      </AlignLayout>
    );
  }
}

export default quickConnect(Home);