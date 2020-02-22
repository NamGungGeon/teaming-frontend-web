import React, { Component, useEffect, useState } from 'react';
import styles from './NotificationList.css';
import { quickConnect } from '../../../redux/quick';
import {
  agreeFriend,
  getNotifications,
  readNotification,
  removeNotification
} from '../../../http/tming';
import { errMsg } from '../../../http/util';
import { randStr } from '../../../utils/utils';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, Menu, MenuItem } from '@material-ui/core';
import axios from 'axios';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';
import getHistory from 'react-router-global-history';
import { getPath } from '../../../utils/url';

const NotificationList = ({ limit, filter, uiKit, auth }) => {
  const [notifications, setNotifications] = useState(null);

  const refresh = async () => {
    console.log('notificationList:: refresh');
    await getNotifications(auth, limit)
      .then(response => {
        const { data: notifications } = response.data;
        setNotifications(notifications);
      })
      .catch(e => {
        uiKit.toaster.cooking(errMsg(e));
      });
  };

  const doRemoveNotification = async id => {
    //remove
    uiKit.loading.start();
    await removeNotification(auth, id)
      .then(response => {
        console.log('notification is removed');
      })
      .catch(e => {
        uiKit.toaster.cooking(errMsg(e));
      });
    await refresh();
    uiKit.loading.end();
  };

  useEffect(() => {
    const timer = window.setInterval(refresh, 30 * 1000);
    (async () => {
      uiKit.loading.start();
      await refresh();
      uiKit.loading.end();
    })();

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  console.log('notificationList', notifications);
  return (
    <span>
      {notifications &&
        notifications.map(notification => {
          const action = () => {
            console.log(notification.type);
            switch (notification.type) {
              case 'friend':
                return () => {
                  uiKit.popup.make(
                    <div>
                      <h4>이 유저의 친구 신청을 수락하시겠습니까?</h4>
                      <br />
                      <AlignLayout align={'right'}>
                        <Button
                          onClick={async () => {
                            uiKit.loading.start();
                            await agreeFriend(auth, notification.ref)
                              .then(response => {
                                uiKit.popup.destroy();
                                uiKit.toaster.make('이제 친구가 되었습니다!');
                              })
                              .catch(e => {
                                uiKit.toaster.cooking(errMsg(e));
                              });
                            uiKit.loading.end();

                            await doRemoveNotification(notification.id);
                          }}
                          color={'primary'}
                          variant={'contained'}
                        >
                          수락
                        </Button>
                        &nbsp;&nbsp;
                        <Button
                          onClick={async () => {
                            uiKit.popup.destroy();
                          }}
                          variant={'contained'}
                        >
                          닫기
                        </Button>
                      </AlignLayout>
                    </div>
                  );
                };
              case 'comment':
                return () => {
                  getHistory().push(getPath(`/community/${notification.ref}`));
                };
              case 'complain':
                return () => {
                  getHistory().push(getPath(`/mypage/service/asked`));
                };
              case 'message':
                return () => {
                  getHistory().push(
                    getPath(
                      `/mypage/community/message?message=${notification.ref}`
                    )
                  );
                };
              default:
                return () => {};
            }
          };

          if (filter && notification.type !== filter) return '';

          return (
            <MenuItem
              variant={'inherit'}
              key={randStr(10)}
              onClick={async () => {
                console.log('clicked');
                await readNotification(auth, notification.id);
                action()();
              }}
            >
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center'
                }}
              >
                <div
                  style={{
                    flex: '1',
                    overflow: 'hidden'
                  }}
                >
                  <div>{notification.title}</div>
                  <Typography noWrap className={'explain'}>
                    {notification.body}
                  </Typography>
                </div>
                <div>
                  <DeleteIcon
                    onClick={() => {
                      doRemoveNotification(notification.id);
                    }}
                  />
                </div>
              </div>
            </MenuItem>
          );
        })}
    </span>
  );
};

NotificationList.defaultProps = {
  limit: 8,
  filter: ''
};

export default quickConnect(NotificationList);
