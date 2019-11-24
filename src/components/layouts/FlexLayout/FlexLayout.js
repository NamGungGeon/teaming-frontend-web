import React from 'react';
import styles from './FlexLayout.module.css';
import classNames from 'classnames';

export default function FlexLayout({
  children,
  margin,
  responsive,
  fixed,
  style
}) {
  return (
    <div
      className={classNames({
        [styles.responsive]: responsive,
        [styles.wrapper]: true
      })}
      style={{ ...style }}
    >
      {children.map((child, idx) => {
        const rate = 100 / children.length;
        const width = `calc(${fixed ? fixed : `${parseInt(rate)}%`} - ${
          margin ? margin * 2 : 0
        }px)`;
        const marg = `${margin ? margin : 0}px`;
        return (
          <div key={idx} style={{ width: width, margin: marg }}>
            {child}
          </div>
        );
      })}
    </div>
  );
}

FlexLayout.defaultProps = {
  align: 'space-between',
  style: {}
};
