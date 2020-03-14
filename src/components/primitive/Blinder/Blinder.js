import React from 'react';
import styles from './Blinder.module.css';
import classNames from 'classnames';

const Blinder = ({ isBlind, children }) => {
  return (
    <div
      className={classNames(styles.blinder, {
        [styles.blinded]: isBlind
      })}
    >
      {children}
    </div>
  );
};

Blinder.defaultProps = {
  isBlind: false
};

export default Blinder;
