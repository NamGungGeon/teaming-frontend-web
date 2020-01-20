import React, {Component} from 'react';
import styles from './EventGallery.module.css';
import {getPath} from "../../utils/url";

import {getEvents} from "../../http/tming";
import Spinner from "reactstrap/es/Spinner";
import {quickConnect} from "../../redux";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import getHistory from 'react-router-global-history';
import {beautifyDate} from "../../utils/utils";

class EventGallery extends Component {
  state={
    events: null,
  };

  componentDidMount() {
    this.reload();
  }

  reload= async ()=>{
    const {uiKit}= this.props;

    uiKit.loading.start();
    await getEvents().then(response=>{
      const {data}= response.data;
      this.setState({
        ...this.state,
        events: data,
      });
    });
    uiKit.loading.end();
  };

  render() {
    const {events}= this.state;

    if(events && events.length=== 0){
      return (<p>진행중인 이벤트가 없습니다</p>)
    }

    return (
      <MenuList style={{
        textAlign: 'left',
        padding: '0',
      }}>
          {
            events?
              events.map(event=>{
                console.log('event', event);
                return (
                  <MenuItem
                    className={styles.event}
                    key={event.title}
                    onClick={()=>{
                      getHistory().push(getPath(`/important/events/${event.id}`));
                    }}>
                    <div className={styles.title}>
                      {event.title}
                    </div>
                    <div className={styles.date}>
                      {beautifyDate(event.endDate)}까지
                    </div>
                  </MenuItem>
                );
              })
              :
              (
                <div style={{
                  width: '100%',
                  textAlign: 'center',
                  padding: '32px',
                }}>
                  <Spinner/>
                </div>
              )
          }
      </MenuList>
    );
  }
}

export default quickConnect(EventGallery);