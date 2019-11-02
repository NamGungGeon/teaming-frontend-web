import React, { Component } from 'react';
import styles from './Wait.module.css';

// TODO: <br /> 태그는 css로 대체하기

class Wait extends Component {
  render() {
    const { msg } = this.props;
    return (
      <div>
        <div className={styles.loading}>
          <div className={styles.blob1}></div>
          <div className={styles.blob2}></div>
        </div>
        {msg && (
          <h5 className={styles.msg}>
            <br />
            <br />
            {msg}
          </h5>
        )}
      </div>
    );
  }
}

export default Wait;
