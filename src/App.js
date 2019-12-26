import './App.css';
import { Route } from 'react-router-dom';
import VerticalNavigation from './components/containers/Navigation/TopNavigation';
import React, { Component } from 'react';
import { UiBundle } from './components/utils/hoc';
import { quickConnect } from './components/redux';
import { getPath } from './components/utils/url';
import {Home, Chat, Teambuild, Auth, Trash, Rooms, Events, Notices} from './components/pages';
import MyPage from "./components/pages/mypage/MyPage";
import Trade from "./components/pages/trade/Trade";
import Privacy from "./components/pages/Privacy";
import Footer from "./components/containers/Footer/Footer";
import Community from "./components/pages/community/Community";
import queryString from "query-string";

// App 은 최상단 컴포넌트인데 mstp를 connected 하는건 좋은패턴이 아님
// UIKit 이랑 Router dispatcher 하는 코드를 어떤 패턴으로 구현했는지 해석이 좀 어려운데
// 리팩토링 필수임

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

    const query= queryString.parse(this.props.location.search);
    const {hideNav}= query;
    if(hideNav)
      this.props.ConfigDispatcher.hideNav();

    this.props.UIKitDispatcher.init(UiBundle(this));
  }

  render() {
    const {config}= this.props;

    return (
      <div>
        {this.props.uiKit && (
          <div>
            {this.props.uiKit.render()}
            <VerticalNavigation
              history={this.props.history}
              location={this.props.location}/>
            <div
              style={{
                top: config.hideNav? '0': '48px',
              }}
              className="fullDisplay">
              <div className="guideLine">
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
              <Footer/>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default quickConnect(App);
