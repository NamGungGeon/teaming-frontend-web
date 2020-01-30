import './App.css';
import { Route } from 'react-router-dom';
import TopNavigation from './components/containers/Navigation/TopNavigation';
import React, { Component } from 'react';
import { UiBundle } from './components/hoc';
import { quickConnect } from './redux/quick';
import { getPath, urlQuery } from './utils/url';
import {
  Home,
  Chat,
  Match,
  Auth,
  Trash,
  Rooms,
  Events,
  Notices,
  Center,
  Admin,
  Magazine
} from './components/pages';
import MyPage from './components/pages/mypage/MyPage';
import Trade from './components/pages/trade/Trade';
import Privacy from './components/pages/Privacy';
import Community from './components/pages/community/Community';
import SideNavigation from './components/containers/Navigation/SideNavigation';
import MobileSideNavigation from './components/containers/Navigation/MobileSideNavigation';
import Footer from './components/containers/Footer/Footer';
import Cyphers from './components/pages/cyphers/Cyphers';
import logo from './components/resource/tming_txt.png';
import MusicPlayer from './components/containers/MusicPlayer/MusicPlayer';
import RecommendYoutube from './components/containers/RecommendYoutube/RecommendYoutube';

class App extends Component {
  state = {
    ready: false
  };

  componentDidMount() {
    this.init();
    console.log('mount: App');

    window.setInterval(() => {
      try {
        document.getElementById('content').style.height = '100%';
      } catch (e) {}
    }, 200);
  }

  componentWillUnmount() {
    console.log('unmount: App');
  }

  init = async () => {
    const {
      AuthDispatcher,
      UIKitDispatcher,
      ConfigDispatcher,
      location,
      history
    } = this.props;
    const query = urlQuery(location);

    //navigation setting
    const { hideNav, imapp } = query;
    if (hideNav) await ConfigDispatcher.hideNav();
    if (imapp) await ConfigDispatcher.imapp();

    //uiKit initialize
    await UIKitDispatcher.init(UiBundle(this));

    //auth info is passed as query-string?
    const { id, token, refresh } = query;
    if (id && token && refresh)
      //yes!
      //wait for storing auth info
      await AuthDispatcher.login(query);
    window.linker = history;
    window.AuthDispatcher = AuthDispatcher;

    //ok finish init
    this.setState({
      ...this.state,
      ready: true
    });
  };

  render() {
    const { config } = this.props;
    const { ready } = this.state;

    return (
      <div>
        {ready && (
          <>
            <div>{this.props.uiKit.render()}</div>
            <TopNavigation
              history={this.props.history}
              location={this.props.location}
            />
            <MobileSideNavigation />
            <div className="fullSizeDisplay">
              <SideNavigation />
              <div
                style={{
                  top: config.hideNav ? '0' : '55px'
                }}
                id={'content'}
                className={'content'}
              >
                <div className="ruler">
                  <Route exact path={getPath('/')} component={Home} />
                  <Route path={getPath('/match')} component={Match} />
                  <Route exact path={getPath('/chat')} component={Chat} />
                  <Route path={getPath('/auth')} component={Auth} />
                  <Route path={getPath('/trash')} component={Trash} />
                  <Route path={getPath('/rooms')} component={Rooms} />
                  <Route path={getPath('/mypage')} component={MyPage} />
                  <Route path={getPath('/trade')} component={Trade} />
                  <Route path={getPath('/privacy')} component={Privacy} />
                  <Route path={getPath('/community')} component={Community} />
                  <Route
                    path={getPath('/important/notices')}
                    component={Notices}
                  />
                  <Route
                    path={getPath('/important/events')}
                    component={Events}
                  />
                  <Route path={getPath('/center')} component={Center} />
                  <Route path={getPath('/cyphers')} component={Cyphers} />
                  <Route path={getPath('/admin')} component={Admin} />
                  <Route path={getPath('/magazine')} component={Magazine} />
                  <div className={'mobile'}>
                    <Footer logo={logo} />
                  </div>
                </div>
                <div className={'sideContent'}>
                  <MusicPlayer />
                  <RecommendYoutube />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default quickConnect(App);
