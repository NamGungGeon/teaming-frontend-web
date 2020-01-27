import React, {Component} from 'react';
import styles from './MusicCard.module.css';

const MusicCard= ({thumbnail, title, tags, link})=> {
  return (
    <div
      onClick={()=>{
        if(link)
          window.open(link);
      }}
      className={styles.wrapper}>
      <div className={styles.content}>
        <h6>
          {title}
        </h6>
        <div className={'explain'}>
          {
            tags.map(tag=>{
              return `#${tag} `;
            })
          }
        </div>
      </div>
      <div
        style={{
          background: `url('${thumbnail}')`
        }}
        className={styles.coverImage}/>
    </div>
  );
};

export default MusicCard;