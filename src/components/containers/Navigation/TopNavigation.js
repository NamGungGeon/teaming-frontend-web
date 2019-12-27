import React, {Component} from 'react';
import styles from './TopNavigation.module.css';
import logo from '../../resource/logo_txt_white.png';
import { NavLink } from 'react-router-dom';
import { getPath } from '../../utils/url';
import classNames from 'classnames';
import {quickConnect} from "../../redux";
import {authorized} from "../../utils/utils";
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ListIcon from '@material-ui/icons/List';

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {Badge} from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


class TopNavigation extends Component{
  state={
    openOptions: false,
    anchor: 0,
  };

  render() {
    const {auth, history, AuthDispatcher, config, sideNav, SideNavDispatcher}= this.props;
    const {hideNav}= config;
    const quickMenus = [
      {
        title: (
          <IconButton>
            <VpnKeyIcon/>
          </IconButton>),
        click: ()=>{
          history.push(getPath('/auth/signin'));
        },
        requireAuth: false,
      },
      {
        title: (
          <IconButton>
            <PersonAddIcon/>
          </IconButton>),
        click: ()=>{
          history.push(getPath('/auth/signup'));
        },
        requireAuth: false,
      },
      {
        title: (
          <IconButton>
            <PersonIcon/>
          </IconButton>
        ),
        click: ()=>{
          history.push(getPath(`/mypage`));
        },
        requireAuth: true,
      },
      {
        title: (
          <span>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={(e)=>{
                console.log(e.currentTarget);
                this.setState({
                  ...this.state,
                  openOptions: true,
                  anchor: e.currentTarget
                })
              }}
            >
              <Badge badgeContent={1} color={'primary'}>
                <NotificationsIcon/>
              </Badge>
            </IconButton>
            <Menu
              style={{
                zIndex: 99999,
              }}
              anchorEl={this.state.anchor}
              keepMounted
              open={this.state.openOptions}
              onClose={()=>{
                this.setState({
                  ...this.state,
                  openOptions: false,
                })
              }}
              PaperProps={{
                style: {
                  width: 300,
                },
              }}
            >
              <MenuItem
                onClick={()=>{
                }}>
                알림!
              </MenuItem>
            </Menu>
          </span>
        ),
        click: ()=>{
        },
        requireAuth: true,
      },
      {
        title: (
          <IconButton>
            <ExitToAppIcon/>
          </IconButton>
        ),
        click: ()=>{
          AuthDispatcher.logout();
          window.alert('로그아웃 되었습니다');
        },
        requireAuth: true,
      },
    ];
    console.log('sideNav', sideNav.content);

    return (
      <nav
        style={{
          display: hideNav? 'none': 'flex',
        }}
        className={classNames(styles.vertical)}>
        <div className={styles.guideLine}>
          <span className={styles.left}>
            <span className={'mobile'}>
              <span
                onClick={()=>{
                  SideNavDispatcher.toggle();
                }}
                style={
                  sideNav.content? {
                    display: `initial`,
                  }:{}
                }
                className={styles.openOption}>
                <IconButton>
                  <ListIcon/>
                </IconButton>
              </span>
            </span>
            &nbsp;
            <NavLink to={getPath('/')}>
              <img src={logo} alt="" className={styles.icon} />
            </NavLink>
          </span>
          <span className={styles.right}>
          {quickMenus.map((value, index) =>
            value.requireAuth === !!authorized(auth) || value.alwaysShow ? (
              <span
                style={{
                  marginLeft: typeof value.title=== 'string'? '16px': '0',
                }}
                key={index}
                onClick={value.click}>
                {value.title}
              </span>
            ) : (
              ''
            )
          )}
        </span>
        </div>
      </nav>
    );
  }
};

TopNavigation.defaultProps= {
  auth: null,
  history: {},
};

export default quickConnect(TopNavigation);
