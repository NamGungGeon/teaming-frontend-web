import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Badge } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { quickConnect } from '../../../redux/quick';
import styles from './Notifications.module.css';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';
import getHistory from 'react-router-global-history';
import Tooltip from '@material-ui/core/Tooltip';
import NotificationList from '../NotificationList/NotificationList';

class Notifications extends Component {
  state = {
    count: null
  };

  updateNotificationBadge = count => {
    this.setState({
      ...this.state,
      count
    });
  };

  componentDidMount() {
    console.log('notifications: im mounted');
  }
  componentWillUnmount() {
    console.log('notifications: i will be unmounted');
  }
  //
  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   return false;
  // }

  render() {
    const { count } = this.state;
    const { uiKit } = this.props;
    const history = getHistory();

    return (
      <span>
        <Tooltip title={'알림'}>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={e => {
              console.log(count);
              if (count === null) {
                uiKit.toaster.cooking('알림 로딩 중 입니다');
                return;
              }

              if (count === 0) {
                uiKit.toaster.cooking('새로운 알림이 없습니다');
                return;
              }

              console.log(e.currentTarget);
              this.setState({
                ...this.state,
                openOptions: true,
                anchor: e.currentTarget
              });
            }}
          >
            {count ? (
              <Badge
                className={styles.badge}
                style={{
                  fontSize: '8px',
                  color: 'white'
                }}
                max={9}
                badgeContent={count}
                color={'primary'}
              >
                <NotificationsIcon />
              </Badge>
            ) : (
              <NotificationsIcon />
            )}
          </IconButton>
        </Tooltip>
        <Menu
          style={{
            zIndex: 99999
          }}
          anchorEl={this.state.anchor}
          keepMounted
          open={this.state.openOptions}
          onClose={() => {
            this.setState({
              ...this.state,
              openOptions: false
            });
          }}
          PaperProps={{
            style: {
              width: 300
            }
          }}
        >
          <MenuItem
            onClick={() => {
              history.push('/mypage/community/notifications');
            }}
            variant={'inherit'}
          >
            <AlignLayout align={'center'}>
              <NotificationsIcon />
              &nbsp;&nbsp;알림 모두 보기
            </AlignLayout>
          </MenuItem>
          <NotificationList limit={8} updated={this.updateNotificationBadge} />
        </Menu>
      </span>
    );
  }
}

export default quickConnect(Notifications);
