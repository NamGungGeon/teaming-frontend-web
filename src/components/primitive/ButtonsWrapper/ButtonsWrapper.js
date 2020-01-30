import React from 'react';
import styles from './ButtonsWrapper.module.css';

const ButtonsWrapper = ({ buttons, children }) => {
  return (
    <div className={styles.wrapper}>
      {buttons &&
        buttons.map(button => {
          return button;
        })}
      {children}
    </div>
  );
};

export default ButtonsWrapper;
