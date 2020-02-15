import React, { Component } from 'react';
import styles from './BoardRow.module.css';

const BoardRow= ({ title, explains, exp_l, exp_r, thumbnail, onClick })=> {
  return (
    <div className={styles.wrapper} onClick={onClick}>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.explain}>
          {
            explains.map(explain=>{
              return (
                <span className="explain">
                  {explain}
                </span>
              )
            })
          }
        </div>
      </div>
      <div className={styles.imgWrap}>
        <img src={thumbnail} alt="" />
      </div>
    </div>
  );
};

BoardRow.defaultProps= {
  thumbnail: '',
  explains: [],
};

export default BoardRow;
