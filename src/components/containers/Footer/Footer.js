import React, {Component} from 'react';
import styles from './Footer.module.css';
import {NavLink} from "react-router-dom";
import {getPath} from "../../utils/url";
import logo from '../../resource/logo_txt_white.png';

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className={styles.guide}>
          <div>
            <img src={logo} alt="" height={36}/>
          </div>
          <br/>
          <div>
            사업문의: tming.dev@gmail.com
          </div>
          <div className={styles.list}>
            <NavLink to={getPath('/privacy')}>
              개인정보처리방침
            </NavLink>
            <NavLink to={getPath('/privacy')}>
              이용약관
            </NavLink>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;