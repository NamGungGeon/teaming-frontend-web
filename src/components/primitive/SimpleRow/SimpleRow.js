import React from 'react';
import styles from './SimpleRow.module.css';
import classNames from 'classnames';

const SimpleRow = ({ title, desc, onClick, className }) => {
  return (
    <div onClick={onClick} className={classNames(styles.wrapper, className)}>
      {title && <span className={styles.title}>{title}</span>}
      {desc && <span className={styles.desc}>{desc}</span>}
    </div>
  );
};

SimpleRow.defaultProps = {
  title: '',
  desc: '',
  onClick: () => {},
  className: ''
};

export default SimpleRow;
