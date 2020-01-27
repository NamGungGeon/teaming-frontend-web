import React, {Component} from 'react';
import {quickConnect} from "../../../redux/quick";
import HorizontalNavigation from "../../containers/Navigation/HorizontalNavigation";
import {getPath} from "../../../utils/url";
import {Route} from "react-router-dom";
import Characters from "./Characters";

class Cyphers extends Component {
  componentDidMount() {
    const {history}= this.props;
    const nav={
      '공략 및 분석': [
        {
          label: '캐릭터',
          onClick: ()=>{
            history.push('/cyphers/characters');
          }
        },
        {
          label: '전적검색',
          onClick: ()=>{
            history.push('/cyphers/search');
          }
        },
        {
          label: '랭킹',
          onClick: ()=>{
            history.push('/cyphers/ranking');
          }
        },
      ],
      '커뮤니티': [
        {
          label: '사이퍼즈 게시판',
          onClick: ()=>{
            history.push('/community?category=cyphers');
          },
        }
      ],
    };
    this.props.SideNavDispatcher.set(nav);
  }

  componentWillUnmount() {
    this.props.SideNavDispatcher.remove();
  }

  render() {
    return (
      <div>
        <Route exact path={getPath('/cyphers/characters')} component={Characters}/>
      </div>
    );
  }
}

export default quickConnect(Cyphers);