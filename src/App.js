import './App.css';
import { Route } from 'react-router-dom';
import VerticalNavigation from './containers/Navigation/VerticalNavigation';
import React, { Component } from 'react';
import { UiBundle } from './lib/ui';
import { quickConnect } from './redux';
import { getPath } from './lib/url';
import Sample from './pages/sample/Sample';
import Guide from './pages/guide/Guide';
import Index from './pages';
import Chat from './pages/chat/Chat';
import TeamBuild from './pages/teambuild/TeamBuild';

// App 은 최상단 컴포넌트인데 mstp를 connected 하는건 좋은패턴이 아님
// UIKit 이랑 Router dispatcher 하는 코드를 어떤 패턴으로 구현했는지 해석이 좀 어려운데
// 리팩토링 필수임

class App extends Component {
  componentDidMount() {
    this.props.UIKitDispatcher.init(UiBundle(this));
    this.props.RouterDispatcher.init(this.props.history);
  }

  render() {
    return (
      <div>
        {this.props.uiKit ? this.props.uiKit.render() : ''}
        <VerticalNavigation />
        <div className="fullDisplay">
          <div className="guideLine">
            <Route exact path={getPath('/')} component={Index} />
            <Route path={getPath('/teambuild')} component={TeamBuild} />
            <Route exact path={getPath('/chat')} component={Chat} />
            <Route path={getPath('/sample')} component={Sample} />
            <Route path={getPath('/guide')} component={Guide} />
          </div>
        </div>
      </div>
    );
  }
}

export default quickConnect(App);
