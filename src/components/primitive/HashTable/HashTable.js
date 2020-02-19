import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './HashTable.module.css';

const HashTable = ({ table, hasHeader }) => {
  return (
    <div className={styles.wrapper}>
      {table &&
        table.map((row, idx) => {
          return (
            <div
              className={classNames(styles.row, {
                [styles.header]: idx === 0 && hasHeader
              })}
              onClick={() => {
                if (row.onClick) row.onClick();
              }}
              style={{
                cursor: row.onClick ? 'pointer' : 'default'
              }}
            >
              <div className={styles.key}>{row.key}</div>
              {row.value && <div className={styles.value}>{row.value}</div>}
            </div>
          );
        })}
    </div>
  );
};

HashTable.defaultProps = {
  table: [],
  hasHeader: false
};

export default HashTable;
