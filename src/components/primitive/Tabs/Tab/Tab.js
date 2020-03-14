import React from 'react';
import classNames from 'classnames';
import styles from './Tab.module.css';
import { Button } from '@material-ui/core';

const Tab = ({ active, startIcon, label, onClick }) => {
  return (
    <Button
      startIcon={startIcon}
      size={'large'}
      onClick={() => {
        onClick(label);
      }}
      className={classNames(styles.tab, {
        [styles.active]: active
      })}
      color={active ? 'secondary' : 'default'}
    >
      {label}
    </Button>
  );
};

Tab.defaultProps = {
  active: false,
  label: 'TAB',
  onClick: () => {}
};

export default Tab;
