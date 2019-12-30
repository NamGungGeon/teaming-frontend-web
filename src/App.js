import './App.css';
import { Route } from 'react-router-dom';
import VerticalNavigation from './components/containers/Navigation/TopNavigation';
import React, { Component } from 'react';
import { UiBundle } from './components/utils/hoc';
import { quickConnect } from './components/redux';
import {getPath, urlQuery} from './components/utils/url';
import {Home, Chat, Teambuild, Auth, Trash, Rooms, Events, Notices} from './components/pages';
import MyPage from "./components/pages/mypage/MyPage";
import Trade from "./components/pages/trade/Trade";
import Privacy from "./components/pages/Privacy";
import Footer from "./components/containers/Footer/Footer";
import Community from "./components/pages/community/Community";
import queryString from "query-string";
import SideNavigation from "./components/containers/Navigation/SideNavigation";
import MobileSideNavigation from "./components/containers/Navigation/MobileSideNavigation";

// App 은 최상단 컴포넌트인데 mstp를 connected 하는건 좋은패턴이 아님
// UIKit 이랑 Router dispatcher 하는 코드를 어떤 패턴으로 구현했는지 해석이 좀 어려운데
// 리팩토링 필수임

class App extends Component {
  state={
    ready: false,
  };

  componentDidMount() {
    this.init();
  }

  init= async ()=>{
    const {AuthDispatcher, location, history}= this.props;

    const query= urlQuery(location);

    //navigation setting
    const {hideNav}= query;
    if(hideNav)
      await this.props.ConfigDispatcher.hideNav();

    //uiKit initialize
    await this.props.UIKitDispatcher.init(UiBundle(this));

    //auth info is passed as query-string?
    const {id, token, refresh }= query;
    if(id && token && refresh){
      //yes!
      //wait for storing auth info
      await AuthDispatcher.login(query);
    }

    //ok finish init
    this.setState({
      ...this.state,
      ready: true,
    })
  }

  render() {
    const {config}= this.props;
    const {ready}= this.state;

    return (
      <div>
        {ready && (
          <div>
            {this.props.uiKit.render()}
            <VerticalNavigation
              history={this.props.history}
              location={this.props.location}/>
              <MobileSideNavigation/>
            <div
              className="fullDisplay">
              <SideNavigation/>
              <div
                style={{
                  top: config.hideNav? '0': '55px',
                }}
                className="guideLine">
                <Route exact path={getPath('/')} component={Home} />
                <Route path={getPath('/teambuild')} component={Teambuild} />
                <Route exact path={getPath('/chat')} component={Chat} />
                <Route path={getPath('/auth')} component={Auth} />
                <Route path={getPath('/trash')} component={Trash} />
                <Route path={getPath('/rooms')} component={Rooms} />
                <Route path={getPath('/mypage')} component={MyPage} />
                <Route path={getPath('/trade')} component={Trade} />
                <Route path={getPath('/privacy')} component={Privacy} />
                <Route path={getPath('/community')} component={Community} />
                <Route path={getPath('/important/notices')} component={Notices} />
                <Route path={getPath('/important/events')} component={Events} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default quickConnect(App);
