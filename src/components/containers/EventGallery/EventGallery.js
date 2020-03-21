import React, { Component } from 'react';
import styles from './EventGallery.module.css';

import { getEvents } from '../../../http/tming';
import { quickConnect } from '../../../redux/quick';
import MenuList from '@material-ui/core/MenuList';
import getHistory from 'react-router-global-history';
import { beautifyDate } from '../../../utils/utils';
import SimpleRow from '../../primitive/SimpleRow/SimpleRow';
import CircularProgress from '@material-ui/core/CircularProgress';

class EventGallery extends Component {
  state = {
    events: null
  };

  componentDidMount() {
    this.reload();
  }

  reload = async () => {
    const { uiKit } = this.props;

    uiKit.loading.start();
    await getEvents().then(response => {
      const { data } = response.data;
      this.setState({
        ...this.state,
        events: data
      });
    });
    uiKit.loading.end();
  };

  render() {
    const { events } = this.state;

    if (events && events.length === 0) {
      return (
        <p
          style={{
            padding: '16px'
          }}
        >
          진행중인 이벤트가 없습니다
        </p>
      );
    }

    return (
      <MenuList
        style={{
          textAlign: 'left',
          padding: '0'
        }}
        className={styles.wrapper}
      >
        {events ? (
          events.map(event => {
            console.log('event', event);
            return (
              <div className={styles.event}>
                <img src={event.banner} alt="event-banner" />
                <SimpleRow
                  className={styles.explain}
                  key={event.title}
                  title={event.title}
                  desc={beautifyDate(event.endDate)}
                  onClick={() => {
                    getHistory().push(`/important/events/${event.id}`);
                  }}
                />
              </div>
            );
          })
        ) : (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              padding: '32px'
            }}
          >
            <CircularProgress />
          </div>
        )}
      </MenuList>
    );
  }
}

export default quickConnect(EventGallery);
