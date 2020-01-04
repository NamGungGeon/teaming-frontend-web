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
import GoogleAdvertise from "../containers/GoogleAdvertise/GoogleAdvertise";
import { AiOutlineWechat } from "react-icons/ai";
import PeopleIcon from '@material-ui/icons/People';
import {FaToiletPaper} from "react-icons/fa";
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { IoIosHeart, } from "react-icons/io";

class Home extends Component{

  componentDidMount() {
    window.scrollTo(0,0);
  }

  render() {
    const {history, location}= this.props;

    const go = path => {
      history.push(path);
    };

    return (
      <AlignLayout align="left">
        <HelpAppInstall/>
        <UsefulInformation/>
        <br/>
        <GoogleAdvertise/>
        <br/><br/>
        <div className={'mobile'}>
          <ButtonsWrapper>
            <SquareButton
              onClick={() => {
                go(getPath(`/teambuild`));
              }}
              icon={people}
              label={'팀 매칭'}
            />
            <SquareButton
              onClick={() => {
                go(getPath(`/chat`));
              }}
              icon={<AiOutlineWechat/>}
              label={'랜덤채팅'}
            />
            <SquareButton
              icon={<PeopleIcon/>}
              label={'커뮤니티'}
              onClick={()=>{
                go(getPath(`/community`));
              }}
            />
            <SquareButton
              icon={<FaToiletPaper/>}
              onClick={()=>{
                go(getPath(`/trash`))
              }}
              label={'화장실'}
            />
            <SquareButton
              icon={<SwapHorizIcon/>}
              label={'거래소'}
              onClick={()=>{
                go(getPath(`/trade`))
              }}
            />
            <SquareButton
              icon={<IoIosHeart/>}
              label={'커플 매칭'}
              onClick={()=>{

              }}
            />
          </ButtonsWrapper>
        </div>
      </AlignLayout>
    );
  }
}

export default quickConnect(Home);