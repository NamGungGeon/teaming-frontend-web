import React, {Component} from 'react';
import {getPath} from "../../utils/url";
import {Route} from "react-router-dom";
import Contents from "./Contents";
import Content from "./Read";
import HorizontalNavigation from "../../containers/Navigation/HorizontalNavigation";
import lol from "../../resource/icon/lol.jpg";
import overwatch from "../../resource/icon/overwatch.png";
import battleground from "../../resource/icon/battleground.png";
import Write from "./Write";
import {quickConnect} from "../../redux";
import getHistory from 'react-router-global-history';
import Update from "./Update";
import Portal from "./Portal";

class Community extends Component {

  componentDidMount() {
    this.props.SideNavDispatcher.set(
      (<HorizontalNavigation
        nav={{
          "일반": [
            {
              label: '자유게시판',
              onClick: () => {
                this.go(getPath(`/community/portal?category=general`));
              }
            },
            {
              label: '익명게시판',
              onClick: () => {
                this.go(getPath(`/community/portal?category=anonymous`));
              }
            },
          ],
          "게임": [
            {
              label: '리그 오브 레전드',
              icon: lol,
              onClick: () => {
                this.go(getPath(`/community/portal?category=lol`));
              }
            },
            {
              label: '오버워치',
              icon: overwatch
            },
            {
              label: '배틀그라운드',
              icon: battleground
            }
          ],
        }}/>)
    );
  }

  go= (path)=>{
    getHistory().push(path);
  };


  componentWillUnmount() {
    this.props.SideNavDispatcher.remove();
  }

  render() {
    return (
      <div>
        <div>
          <Route exact path={getPath(`/community/write`)} component={Write}/>
          <Route exact path={getPath(`/community`)} component={Contents}/>
          <Route exact path={getPath(`/community/portal`)} component={Portal}/>
          <Route exact path={getPath(`/community/read/:id`)} component={Content}/>
          <Route exact path={getPath(`/community/update/:id`)} component={Update}/>
        </div>
      </div>
    );
  }
}

export default quickConnect(Community);