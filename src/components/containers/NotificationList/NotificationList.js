import React, { useEffect, useState } from 'react';
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
import { Button, MenuItem } from '@material-ui/core';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';
import getHistory from 'react-router-global-history';
import IconButton from '@material-ui/core/IconButton';

const NotificationList = ({ limit, filter, updated, uiKit, auth }) => {
  const [notifications, setNotifications] = useState(null);

  const refresh = async () => {
    console.log('notificationList:: refresh');
    await getNotifications(auth, limit)
      .then(response => {
        const { data: notifications } = response.data;
        setNotifications(notifications);
        updated(response.data.count);
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
    console.log('notificationList is mounted');
    const timer = window.setInterval(refresh, 5 * 1000);
    refresh();
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
                      <h4>??? ????????? ?????? ????????? ?????????????????????????</h4>
                      <br />
                      <AlignLayout align={'right'}>
                        <Button
                          onClick={async () => {
                            uiKit.loading.start();
                            await agreeFriend(auth, notification.ref)
                              .then(response => {
                                uiKit.popup.destroy();
                                uiKit.toaster.make('?????? ????????? ???????????????!');
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
                          ??????
                        </Button>
                        &nbsp;&nbsp;
                        <Button
                          onClick={async () => {
                            uiKit.popup.destroy();
                          }}
                          variant={'contained'}
                        >
                          ??????
                        </Button>
                      </AlignLayout>
                    </div>
                  );
                };
              case 'comment':
                return () => {
                  getHistory().push(`/community/read/${notification.ref}`);
                };
              case 'complain':
                return () => {
                  getHistory().push(`/mypage/service/asked`);
                };
              case 'message':
                return () => {
                  getHistory().push(
                    `/mypage/community/message?message=${notification.ref}`
                  );
                };
              default:
                return () => {};
            }
          };

          if (filter && notification.type !== filter) return '';

          return (
            <MenuItem variant={'inherit'} key={randStr(10)}>
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
                  onClick={async () => {
                    console.log('clicked');
                    await readNotification(auth, notification.id);
                    action()();
                  }}
                >
                  <div>{notification.title}</div>
                  <Typography noWrap className={'explain'}>
                    {notification.body}
                  </Typography>
                </div>
                <div>
                  <IconButton>
                    <DeleteIcon
                      onClick={() => {
                        doRemoveNotification(notification.id);
                      }}
                    />
                  </IconButton>
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
  filter: '',
  updated: count => {}
};

export default quickConnect(NotificationList);
