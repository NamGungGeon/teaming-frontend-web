import './App.css';
import { Route, Switch } from 'react-router-dom';
import TopNavigation from './components/containers/Navigation/TopNavigation';
import React, { Component, Suspense } from 'react';
import { quickConnect } from './redux/quick';
import { urlQuery } from './utils/url';
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
  Magazine,
  Admin,
  Cyphers,
  Youtuber,
  MyPage,
  Trade,
  Privacy,
  Community,
  Contact
} from './components/pages';

import SideNavigation from './components/containers/Navigation/SideNavigation';
import MobileSideNavigation from './components/containers/Navigation/MobileSideNavigation';
import Footer from './components/containers/Footer/Footer';
import logo from './components/resource/tming_txt.png';
import MusicPlayer from './components/containers/MusicPlayer/MusicPlayer';
import Advertise from './components/containers/Advertise/Advertise';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import Optional from './components/primitive/Optional/Optional';
import { Button } from '@material-ui/core';
import HocWrapper from './components/containers/HocWrapper/HocWrapper';
import firebase from 'firebase/app';
import 'firebase/messaging';
import { registerFCM } from './http/tming';
import { authorized } from './utils/utils';
import HelpAppInstall from './components/containers/HelpAppInstall/HelpAppInstall';
import Splash from './components/primitive/Splash/Splash';
import FatalError from './components/primitive/FatalError/FatalError';
import { createErrorLog } from './http/cyphers';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      fatalError: false
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
  componentDidCatch(error, info) {
    console.error(error, info);
    createErrorLog(error, info).catch(e => {
      console.error(e);
    });
    this.setState({
      ...this,
      fatalError: true
    });
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
    const { ready, fatalError } = this.state;

    return (
      <div>
        <HocWrapper />
        {fatalError && <FatalError />}
        {!fatalError && ready && uiKit && (
          <>
            <TopNavigation
              history={history}
              location={this.props.location}
            />
            <MobileSideNavigation />
            <HelpAppInstall />
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
                  <Suspense fallback={<Splash />}>
                    <Switch>
                      <Route exact path={'/'} component={Home} />
                      <Route path={'/match'} component={Match} />
                      <Route exact path={'/chat'} component={Chat} />
                      <Route path={'/auth'} component={Auth} />
                      <Route path={'/trash'} component={Trash} />
                      <Route path={'/rooms'} component={Rooms} />
                      <Route path={'/mypage'} component={MyPage} />
                      <Route path={'/trade'} component={Trade} />
                      <Route path={'/privacy'} component={Privacy} />
                      <Route path={'/contact'} component={Contact} />
                      <Route path={'/community'} component={Community} />
                      <Route path={'/important/notices'} component={Notices} />
                      <Route path={'/important/events'} component={Events} />
                      <Route path={'/center'} component={Center} />
                      <Route path={'/cyphers'} component={Cyphers} />
                      <Route path={'/admin'} component={Admin} />
                      <Route path={'/magazine'} component={Magazine} />
                      <Route path={'/youtuber'} component={Youtuber} />
                    </Switch>
                  </Suspense>
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
                        history.push('/admin');
                      }}
                      color={'secondary'}
                      variant={'contained'}
                    >
                      관리자 페이지로 이동
                    </Button>
                    <br />
                  </Optional>
                  <MusicPlayer />
                  <Advertise />
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
