import React from 'react';
import styles from './HorizontalSlicedLayout.module.css';

const HorizontalSlicedLayout = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      {children[0]}
      {typeof children[1] === 'boolean' ? '' : children[1]}
    </div>
  );
};

export default HorizontalSlicedLayout;
