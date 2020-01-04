import React, {Component} from 'react';
import styles from './ButtonsWrapper.module.css';
import {randStr} from "../../utils/utils";

const ButtonsWrapper= ({buttons, children})=> {
  return (
    <div className={styles.wrapper}>
      {
        buttons && buttons.map(button=>{
          return button;
        })
      }
      {
        children
      }
    </div>
  );
};


export default ButtonsWrapper;