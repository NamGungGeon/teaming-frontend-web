import React, { Component } from 'react';
import styles from './Divider.module.css';

class Divider extends Component {
  render() {
    const { label } = this.props;

    return (
      <div>
        <div className={styles.wrapper}>
          <div className={styles.border}></div>
          {label && <div className={styles.label}>{label}</div>}
          <div className={styles.border}></div>
        </div>
      </div>
    );
  }
}

export default Divider;
