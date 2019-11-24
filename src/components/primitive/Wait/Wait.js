import React, { Component } from 'react';
import styles from './Wait.module.css';

class Wait extends Component {
  render() {
    const { msg } = this.props;
    return (
      <div>
        <div className={styles.loading}>
          <div className={styles.blob1}></div>
          <div className={styles.blob2}></div>
        </div>
        {msg && <h5 className={styles.msg}>{msg}</h5>}
      </div>
    );
  }
}

export default Wait;
