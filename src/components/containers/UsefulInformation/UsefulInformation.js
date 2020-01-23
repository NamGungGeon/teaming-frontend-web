import React, {Component} from 'react';
import styles from './UsefulInformation.module.css';
import EventGallery from "../EventGallery/EventGallery";
import Notices from "../Notices/Notices";
import Section from "../../primitive/Section/Section";
import {getPath} from "../../../utils/url";
import getHistory from 'react-router-global-history';
import Carousel from "../Carousel/Carousel";

const UsefulInformation= ()=> {
  const history= getHistory();

  return (
    <div className={styles.wrapper}>
      <Section divideStyle={'fill'}>
        <p style={{
          textAlign: 'left',
        }}>
          <b
            style={{
              cursor: 'pointer'
            }}
            onClick={()=>{
              history.push(getPath(`/important/events`));
            }}>
           진행중인 이벤트
          </b>
        </p>
        <EventGallery/>
      </Section>
      <Section divideStyle={'fill'}>
        <p style={{
          textAlign: 'left',
        }}>
          <b
            style={{
              cursor: 'pointer'
            }}
            onClick={()=>{
              history.push(getPath(`/important/notices`));
            }}>
            공지사항
          </b>
        </p>
        <Notices history={history}/>
      </Section>
    </div>
  );
}

export default UsefulInformation;