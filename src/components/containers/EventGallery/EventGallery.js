import React, {Component} from 'react';
import styles from './EventGallery.module.css';
import {getPath} from "../../utils/url";
import {randStr} from "../../utils/utils";
import eventImg from '../../resource/event1.png';
import Button from "reactstrap/es/Button";
import classNames from "classnames";
import {getEvents} from "../../http/tming";
import Spinner from "reactstrap/es/Spinner";

class EventGallery extends Component {
  state={
    events: null,
  };

  componentDidMount() {
    getEvents().then(response=>{
      const {data}= response.data;
      this.setState({
        ...this.state,
        events: data,
      });
    });
  }

  render() {
    const {history, limit, style}= this.props;
    const {events}= this.state;

    if(events && events.length=== 0){
      return (<p>진행중인 이벤트가 없습니다</p>)
    }

    return (
      <div>
        <div className={classNames(styles.wrapper, style)}>
          {
            events?
              events.map((event, idx)=>{
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
              :
              (<div style={{
                  width: '100%',
                  textAlign: 'center',
                  padding: '32px',
                }}>
                  <Spinner/>
                </div>)
          }
        </div>
      </div>
    );
  }
}

export default EventGallery;