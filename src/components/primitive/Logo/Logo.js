import React, {Component} from 'react';
import fullLogo from "../../resource/logo_white.png";
import styles from './Logo.module.css';

class Logo extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <img
          className={styles.logo}
          alt="logo"
          src={fullLogo}/>
        <br/><br/>
      </div>
    );
  }
}

export default Logo;