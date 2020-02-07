import React from 'react';
import styles from './Floating.module.css';
import classNames from 'classnames';

const Floating = ({ className, style, children }) => {
  return (
    <div style={style} className={classNames(styles.wrapper, className)}>
      {children}
    </div>
  );
};

Floating.defaultProps = {
  className: '',
  style: {},
  children: <></>
};

export default Floating;
