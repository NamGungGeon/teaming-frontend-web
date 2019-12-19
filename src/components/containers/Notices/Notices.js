import React, {Component} from 'react';
import {randNum, randStr} from "../../utils/utils";
import styles from './Notices.module.css';
import {getPath} from "../../utils/url";

const notices= [
  {
    id: randNum(1000),
    title: `${randStr(20)}`,
    date: `${new Date().toString()}`,
  },
  {
    id: randNum(1000),
    title: `${randStr(20)}`,
    date: `${new Date().toString()}`,
  },
  {
    id: randNum(1000),
    title: `${randStr(20)}`,
    date: `${new Date().toString()}`,
  },
  {
    id: randNum(1000),
    title: `${randStr(20)}`,
    date: `${new Date().toString()}`,
  },
  {
    id: randNum(1000),
    title: `${randStr(20)}`,
    date: `${new Date().toString()}`,
  },
];

const Notices= ({history,})=> {
  return (
    <div style={{
      textAlign: 'left',
    }}>
      {
        notices.map(notice=>{
          return (
            <p
              className={styles.notice}
              onClick={()=>{
                history.push(getPath(`/notices/${notice.id}`));
              }}>
                <span className={styles.title}>
                {notice.title}
                </span>
              <div className={styles.date}>
                {notice.date}
              </div>
            </p>
          )
        })
      }
    </div>
  );
}

export default Notices;