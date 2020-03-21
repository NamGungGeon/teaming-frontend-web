import React, { Component } from 'react';
import { beautifyDate } from '../../../utils/utils';
import styles from './Notices.module.css';
import { getNotices } from '../../../http/tming';
import MenuList from '@material-ui/core/MenuList';
import SimpleRow from '../../primitive/SimpleRow/SimpleRow';
import CircularProgress from '@material-ui/core/CircularProgress';

class Notices extends Component {
  state = {
    notices: null
  };

  componentDidMount() {
    getNotices().then(response => {
      console.log('get notices', response.data);
      this.setState({
        ...this.state,
        notices: response.data.data
      });
    });
  }

  render() {
    const { history } = this.props;
    const { notices } = this.state;

    if (notices && notices.length === 0) {
      return (
        <p
          style={{
            padding: '16px'
          }}
        >
          공지사항이 없습니다
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
        {notices ? (
          notices.map(notice => {
            return (
              <SimpleRow
                key={notice.title}
                onClick={() => {
                  history.push(`/important/notices/${notice.id}`);
                }}
                title={notice.title}
                desc={beautifyDate(notice.createdAt)}
              />
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

export default Notices;
