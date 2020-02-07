import React, { Component } from 'react';
import styles from './BoardRow.module.css';

class BoardRow extends Component {
  render() {
    const { title, exp_l, exp_r, thumbnail, onClick } = this.props;

    return (
      <div className={styles.wrapper} onClick={onClick}>
        {thumbnail && (
          <div className={styles.imgWrap}>
            <img src={thumbnail} alt="" />
          </div>
        )}
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div className={styles.explain}>
            <span className={'explain'}>{exp_l}</span>
            <span
              className={'explain'}
              style={{
                textAlign: 'right'
              }}
            >
              {exp_r}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default BoardRow;
