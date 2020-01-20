import React, {Component} from 'react';
import styles from './Gallery.module.css';
import getHistory from 'react-router-global-history';
import {getPath} from "../../utils/url";

const Gallery= ({list, max})=>{
  return (
    <div className={styles.wrapper}>
      {
        list.map(one=>{
          return (
            <div
              onClick={()=>{
                if(one.link)
                  getHistory().push(getPath(one.link))
              }}
              className={styles.frame}>
              <img className={styles.img} src={one.img} alt=""/>
              <div className={styles.title}>
                {one.title}
              </div>
              <div className={styles.explain}>
                {one.explain}
              </div>
            </div>
          )
        })
      }
    </div>
  );
};

Gallery.defaultProps= {
  list: [],
  max: 4,
};


export default Gallery;