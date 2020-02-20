import './App.css';
import { Route } from 'react-router-dom';
import TopNavigation from './components/containers/Navigation/TopNavigation';
import React, { Component } from 'react';
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
  Magazine,
  Youtuber
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
import GoogleAdvertise from './components/containers/GoogleAdvertise/GoogleAdvertise';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import Optional from './components/primitive/Optional/Optional';
import { Button } from '@material-ui/core';
import HocWrapper from './components/containers/HocWrapper/HocWrapper';
import firebase from 'firebase/app';
import 'firebase/messaging';
import { registerFCM } from './http/tming';
import { authorized } from './utils/utils';
import Contact from './components/pages/Contact';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false
    };
    try {
      this.messaging = firebase.messaging();
      this.messaging.usePublicVapidKey(
        'BIrV7uyitS8cjnVhcZwwYaU6kRmnU1ndXaQu31SpV8JzcsnAAdbSnhfDa-7tcbZnZSHHtna7YGs9r3oHNrxOun4'
      );
    } catch (e) {
      console.log(e);
    }
  }

  async componentDidMount() {
    this.init();

    window.setInterval(() => {
      try {
        document.getElementById('content').style.height = '100%';
      } catch (e) {}
    }, 200);

    // TODO ask for fcm notification permission
    const { auth } = this.props;

    if (authorized(auth)) {
      try {
        await this.messaging.requestPermission();
        const token = await this.messaging.getToken();
        if (token) {
          await registerFCM(token, auth);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  init = async () => {
    const { AuthDispatcher, ConfigDispatcher, location, history } = this.props;
    const query = urlQuery(location);

    //navigation setting
    const { hideNav, imapp } = query;
    if (hideNav) {
      await ConfigDispatcher.hideNav();
    }
    if (imapp) {
      await ConfigDispatcher.imapp();
    }

    //uiKit initialize

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
    const { config, history, uiKit } = this.props;
    const { ready } = this.state;

    return (
      <div>
        <HocWrapper />
        {ready && uiKit && (
          <>
            <TopNavigation
              history={this.props.history}
              location={this.props.location}
            />
            <MobileSideNavigation />
            <div className="fullSizeDisplay">
              <SideNavigation />
              <div
                style={{
                  top: config.hideNav ? '0' : '56px'
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
                  <Route path={getPath('/contact')} component={Contact} />
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
                  <Route path={getPath('/youtuber')} component={Youtuber} />

                  <div className={'mobile'}>
                    <Footer logo={logo} />
                  </div>
                </div>
                <div className={'sideContent'}>
                  <Optional onlyAdmin>
                    <Button
                      fullWidth
                      size={'large'}
                      startIcon={<SupervisedUserCircleIcon />}
                      onClick={() => {
                        history.push(getPath('/admin'));
                      }}
                      color={'secondary'}
                      variant={'contained'}
                    >
                      관리자 페이지로 이동
                    </Button>
                    <br />
                  </Optional>
                  <MusicPlayer />
                  <GoogleAdvertise />
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
