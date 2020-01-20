import React, {Component} from 'react';
import styles from './Footer.module.css';
import {NavLink} from "react-router-dom";
import {getPath} from "../../utils/url";
import whiteLogo from '../../resource/logo_txt_white.png';

class Footer extends Component {
  render() {
    const {logo}= this.props;
    return (
      <footer>
        <div className={styles.guide}>
          <div>
            <img src={logo? logo: whiteLogo} alt="" height={36}/>
          </div>
          <div className={styles.texts}>
            <div>
              사업문의: tming.dev@gmail.com
            </div>
            <div>
              사업자등록번호: 270-09-01066
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
        </div>
      </footer>
    );
  }
}

export default Footer;