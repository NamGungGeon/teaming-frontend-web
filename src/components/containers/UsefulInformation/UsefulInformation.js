import React from 'react';
import styles from './UsefulInformation.module.css';
import EventGallery from '../EventGallery/EventGallery';
import Notices from '../Notices/Notices';
import Section from '../../primitive/Section/Section';
import getHistory from 'react-router-global-history';

const UsefulInformation = () => {
  const history = getHistory();
  const headerStyle = {
    padding: '16px',
    textAlign: 'left',
    borderBottom: '0.6px solid #e9e9e9'
  };

  return (
    <div className={styles.wrapper}>
      <Section
        style={{
          padding: 0
        }}
        divideStyle={'fill'}
      >
        <div style={headerStyle}>
          <b
            style={{
              cursor: 'pointer'
            }}
            onClick={() => {
              history.push((`/important/events`));
            }}
          >
            진행중인 이벤트
          </b>
        </div>
        <EventGallery />
      </Section>
      <Section
        style={{
          padding: 0
        }}
        divideStyle={'fill'}
      >
        <div style={headerStyle}>
          <b
            style={{
              cursor: 'pointer'
            }}
            onClick={() => {
              history.push((`/important/notices`));
            }}
          >
            공지사항
          </b>
        </div>
        <Notices history={history} />
      </Section>
    </div>
  );
};

export default UsefulInformation;
