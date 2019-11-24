import React, {Component} from 'react';
import styles from './EventGallery.module.css';
import {getPath} from "../../utils/url";
import {randStr} from "../../utils/utils";
import eventImg from '../../resource/event1.png';

class EventGallery extends Component {
  state={
    events: [
      {id: randStr(20), img: eventImg, title: '초특급이벤트!!'},
      {id: randStr(20), img: eventImg, title: '초특급이벤트!!'},
      {id: randStr(20), img: eventImg, title: '초특급이벤트!!'},
    ],

  }
  render() {
    const {history}= this.props;

    return (
      <div className={styles.wrapper}>
        {
          this.state.events.map(event=>{
            return (
              <div className={styles.event}>
                <img
                  src={event.img}
                  alt=""
                  onClick={()=>{
                    history.push(getPath(`/events/${event.id}`));
                  }}/>
                  <div className={styles.title}>
                    {event.title}
                    <br/>
                    (1일 남음)
                  </div>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default EventGallery;