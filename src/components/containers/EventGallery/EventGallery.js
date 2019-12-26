import React, {Component} from 'react';
import styles from './EventGallery.module.css';
import {getPath} from "../../utils/url";
import classNames from "classnames";
import {getEvents} from "../../http/tming";
import Spinner from "reactstrap/es/Spinner";
import {quickConnect} from "../../redux";

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
                      src={event.banner}
                      alt=""
                      onClick={()=>{
                        history.push(getPath(`/important/events/${event.id}`));
                      }}/>
                  </div>
                )
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
        </div>
      </div>
    );
  }
}

export default quickConnect(EventGallery);