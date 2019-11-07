import React from 'react';
import styles from './FixedCenter.module.css';

export default ({ children }) => (
  <div className={styles.wrapper}>
    <div>{children}</div>
  </div>
);
