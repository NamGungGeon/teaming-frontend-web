import React, {Component} from 'react';
import AlignLayout from '../layouts/AlignLayout/AlignLayout';

import SquareButton from '../primitive/SquareButton/SquareButton';
import {getPath, urlQuery} from '../../utils/url';
import people from '../resource/icon/people.png';
import UsefulInformation from "../containers/UsefulInformation/UsefulInformation";
import ButtonsWrapper from "../primitive/ButtonsWrapper/ButtonsWrapper";
import {quickConnect} from "../../redux/quick";
import HelpAppInstall from "../containers/HelpAppInstall/HelpAppInstall";
import GoogleAdvertise from "../containers/GoogleAdvertise/GoogleAdvertise";
import { AiOutlineWechat } from "react-icons/ai";
import PeopleIcon from '@material-ui/icons/People';
import {FaToiletPaper} from "react-icons/fa";
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { IoIosHeart, } from "react-icons/io";
import Magazine from "../containers/Magazine/Magazine";
import Section from "../primitive/Section/Section";
import HottestPosts from "../containers/HottestPosts/HottestPosts";

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
        <br/>
        <Section>
          <h6
            style={{
              cursor: 'pointer',
            }}
            onClick={()=>{
              history.push(getPath('/magazine'));
            }}>
            매거진
          </h6>
          <br/>
          <Magazine max={4}/>
        </Section>
        <br/>
        <HottestPosts/>
        <br/>
      </AlignLayout>
    );
  }
}

export default quickConnect(Home);