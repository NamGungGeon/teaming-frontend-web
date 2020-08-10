import React from 'react';
import styles from './Splash.module.css';
import logo from '../../resource/logo_img.png';

const Splash = () => {
  return (
    <div className={styles.background}>
      <img className={styles.logo} src={logo} alt="" />
      <br />
      <br />
      <span className={styles.name}>티밍</span>
      <br />
      <p
        className="explain"
        style={{
          textAlign: 'center'
        }}
      >
        로딩 중 입니다
        <br />
        잠시만 기다려주세요
      </p>
    </div>
  );
};

export default Splash;
