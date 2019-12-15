import React from 'react';
import styles from './TopNavigation.module.css';
import logo from '../../resource/logo_txt_white.png';
import { NavLink } from 'react-router-dom';
import { getPath } from '../../utils/url';
import classNames from 'classnames';
import {quickConnect} from "../../redux";
import {authorized} from "../../utils/utils";
import queryString from 'query-string';



const TopNavigation= ({auth, history, location, AuthDispatcher, config})=> {
  const quickMenus = [
    {
      title: '로그인',
      click: ()=>{
        history.push(getPath('/auth/signin'));
      },
      requireAuth: false,
    },
    {
      title: '회원가입',
      click: ()=>{
        history.push(getPath('/auth/signup'));
      },
      requireAuth: false,
    },
    {
      title: '마이페이지',
      click: ()=>{
        history.push(getPath(`/mypage`));
      },
      requireAuth: true,
    },
    {
      title: '로그아웃',
      click: ()=>{
        AuthDispatcher.logout();
        window.alert('로그아웃 되었습니다');
      },
      requireAuth: true,
    }
  ];

  const {hideNav}= config;

  return (
    <nav
      style={{
        display: hideNav? 'none': 'flex',
      }}
      className={classNames(styles.vertical)}>
      <div className={`${styles.guideLine}`}>
        <span className={styles.left}>
          <NavLink to={getPath('/')}>
            <img src={logo} alt="" className={styles.icon} />
          </NavLink>
        </span>
        <span className={styles.right}>
          {quickMenus.map((value, index) =>
            value.requireAuth === !!authorized(auth) || value.alwaysShow ? (
              <span key={index} onClick={value.click}>
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
};

TopNavigation.defaultProps= {
  auth: null,
  history: {},
};

export default quickConnect(TopNavigation);
