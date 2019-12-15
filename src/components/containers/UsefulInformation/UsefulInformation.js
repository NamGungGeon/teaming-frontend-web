import React, {Component} from 'react';
import styles from './UsefulInformation.module.css';
import EventGallery from "../EventGallery/EventGallery";
import Notices from "../Notices/Notices";
import Section from "../../primitive/Section/Section";

const UsefulInformation= ({history,})=> {
  return (
    <div className={styles.wrapper}>
      <Section>
        <p style={{
          textAlign: 'left',
        }}>
          <h5>진행중인 이벤트</h5>
        </p>
        <EventGallery
          style={{
            flexDirection: 'column',
          }}
          history={history}/>
      </Section>
      <Section>
        <p style={{
          textAlign: 'left',
        }}>
          <h5>공지사항</h5>
        </p>
        <Notices history={history}/>
      </Section>
    </div>
  );
}

export default UsefulInformation;