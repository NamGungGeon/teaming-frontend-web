import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import styles from './TopNavigation.module.css';
import logo from '../../resource/tming_txt.png';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { quickConnect } from '../../../redux/quick';
import { authorized, randStr } from '../../../utils/utils';
import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ListIcon from '@material-ui/icons/List';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Tooltip from '@material-ui/core/Tooltip';
import Login from '../Login/Login';
import getHistory from 'react-router-global-history';
import Notifications from '../Notifications/Notifications';

const TopNavigation = ({
  auth,
  uiKit,
  AuthDispatcher,
  config,
  SideNavDispatcher
}) => {
  const history = getHistory();
  const { hideNav } = config;
  const quickMenus = [
    {
      title: (
        <Tooltip title={'로그인'}>
          <IconButton>
            <VpnKeyIcon />
          </IconButton>
        </Tooltip>
      ),
      click: () => {
        uiKit.popup.make(<Login />);
      },
      requireAuth: false
    },
    {
      title: (
        <Tooltip title={'회원가입'}>
          <IconButton>
            <PersonAddIcon />
          </IconButton>
        </Tooltip>
      ),
      click: () => {
        history.push('/auth/signup');
      },
      requireAuth: false
    },
    {
      title: (
        <Tooltip title={'마이페이지'}>
          <IconButton>
            <PersonIcon />
          </IconButton>
        </Tooltip>
      ),
      click: () => {
        history.push(`/mypage/info`);
      },
      requireAuth: true
    },
    {
      title: (
        <Tooltip title={'알림'}>
          <Notifications />
        </Tooltip>
      ),
      click: () => {},
      requireAuth: true
    },
    {
      title: (
        <Tooltip title={'로그아웃'}>
          <IconButton>
            <ExitToAppIcon />
          </IconButton>
        </Tooltip>
      ),
      click: async () => {
        await firebase.auth().signOut();
        AuthDispatcher.logout();
        history.push('/');
        window.alert('로그아웃 되었습니다');
      },
      requireAuth: true
    }
  ];

  return (
    <nav
      style={{ display: hideNav ? 'none' : 'flex' }}
      className={classNames(styles.vertical)}
    >
      <div className={styles.ruler}>
        <span className={styles.left}>
          <span className={'mobile'}>
            <span
              onClick={() => {
                SideNavDispatcher.toggle();
              }}
              className={styles.openOption}
            >
              <IconButton>
                <ListIcon />
              </IconButton>
            </span>
          </span>
          &nbsp;
          <NavLink to={('/')}>
            <img src={logo} alt="" className={styles.icon} />
          </NavLink>
        </span>
        <span className={styles.right}>
          {quickMenus.map(
            menu =>
              menu.requireAuth === !!authorized(auth) && (
                <span key={randStr(10)} onClick={menu.click}>
                  {menu.title}
                </span>
              )
          )}
        </span>
      </div>
    </nav>
  );
};

export default quickConnect(TopNavigation);
