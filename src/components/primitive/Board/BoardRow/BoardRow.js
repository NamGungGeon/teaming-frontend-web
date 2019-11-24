import React, {Component} from 'react';
import styles from './BoardRow.module.css';

class BoardRow extends Component {
  render() {
    const {title, exp_l, exp_r, thumbnail, onClick}= this.props;

    return (
      <div
        className={styles.wrapper}
        onClick={onClick}>
        <div className={styles.imgWrap}>
          {
            thumbnail && (<img src={thumbnail} alt=""/>)
          }
        </div>
        <div className={styles.content}>
          <div className={styles.title}>
            {title}
          </div>
          <div className={styles.explain}>
          <span>
            {exp_l}
          </span>
            <span>
            {exp_r}
          </span>
          </div>
        </div>
      </div>
    );
  }
}

export default BoardRow;