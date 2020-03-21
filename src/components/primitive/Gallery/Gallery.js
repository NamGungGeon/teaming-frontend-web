import React from 'react';
import styles from './Gallery.module.css';
import getHistory from 'react-router-global-history';

const Gallery = ({ list, max }) => {
  return (
    <div className={styles.wrapper}>
      {list.map((one, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              if (one.link) getHistory().push(one.link);
            }}
            className={styles.frame}
          >
            <div className={styles.imgWrapper}>
              <img className={styles.img} src={one.img} alt="" />
            </div>
            <div>
              <div className={styles.title}>{one.title}</div>
              <div className={styles.explain}>{one.explain}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Gallery.defaultProps = {
  list: [],
  max: 4
};

export default Gallery;
