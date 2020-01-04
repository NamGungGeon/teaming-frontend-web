import React, {Component} from 'react';
import styles from './ButtonsWrapper.module.css';
import {randStr} from "../../utils/utils";

const ButtonsWrapper= ({buttons})=> {
  return (
    <div className={styles.wrapper}>
      {
        buttons.map(button=>{
          return button;
        })
      }
    </div>
  );
};


export default ButtonsWrapper;