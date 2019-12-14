import React, {Component} from 'react';
import styles from './EventGallery.module.css';
import {getPath} from "../../utils/url";
import {randStr} from "../../utils/utils";
import eventImg from '../../resource/event1.png';
import Button from "reactstrap/es/Button";
import classNames from "classnames";

class EventGallery extends Component {
  static defaultProps= {
    limit: 99999,
    style: {},
  }
  state={
    events: [
      {id: randStr(20), img: eventImg, title: '초특급이벤트!!'},
      {id: randStr(20), img: eventImg, title: '초특급이벤트!!'},
      {id: randStr(20), img: eventImg, title: '초특급이벤트!!'},
    ],

  }
  render() {
    const {history, limit, style}= this.props;
    const {events}= this.state;

    return (
      <div>
        <div className={classNames(styles.wrapper, style)}>
          {
            this.state.events.map((event, idx)=>{
              if(idx+1> limit)
                return;

              return (
                <div className={styles.event}>
                  <img
                    src={event.img}
                    alt=""
                    onClick={()=>{
                      history.push(getPath(`/events/${event.id}`));
                    }}/>
                  <div className={styles.title}>
                    (1일 남음)
                    &nbsp;&nbsp;
                    {event.title}
                  </div>
                </div>
              )
            })
          }
        </div>
        {
          limit< events.length && (
            <Button
              color={'link'}
              style={{
                color: 'white',
                fontWeight: 600,

              }}
              onClick={()=>{
                history.push(getPath('/events'));
              }}>
              전체 이벤트 보기
            </Button>
          )
        }
      </div>
    );
  }
}

export default EventGallery;