import React, { Component } from 'react';
import PageTitle from '../../../primitive/PageTitle/PageTitle';
import { getNotifications, removeNotification } from '../../../../http/tming';
import { errMsg } from '../../../../http/util';
import { quickConnect } from '../../../../redux/quick';
import MenuItem from '@material-ui/core/MenuItem';
import { randStr } from '../../../../utils/utils';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Section from '../../../primitive/Section/Section';
import AlignLayout from '../../../layouts/AlignLayout/AlignLayout';
import { Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Tabs from "../../../primitive/Tabs/Tabs/Tabs";
import ReorderIcon from '@material-ui/icons/Reorder';
import PeopleIcon from '@material-ui/icons/People';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import EmailIcon from '@material-ui/icons/Email';

class Notifications extends Component {
  state = {
    notifications: null,
    count: 0
  };

  componentDidMount() {
    this.loadNotifications();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(this.state);
  }

  loadNotifications = async () => {
    const { auth, uiKit } = this.props;

    uiKit.loading.start();
    await getNotifications(auth, 99999)
      .then(response => {
        if (response.data.count === 0) {
          uiKit.toaster.cooking('알림이 없습니다');
          return;
        }

        this.setState({
          ...this.state,
          count: response.data.count,
          notifications: response.data.data
        });
      })
      .catch(e => {
        console.log(errMsg(e));
      });
    uiKit.loading.end();
  };

  removeReadNotifications = () => {
    const { uiKit } = this.props;
    uiKit.popup.make(
      <div>
        <h5>읽은 알림을 모두 삭제하시겠습니까?</h5>
        <br />
        <AlignLayout align={'right'}>
          <Button
            onClick={() => {
              const { notifications } = this.state;
              notifications.map(async notification => {
                if (notification.isRead)
                  await this.removeNotification(notification.id);
              });
              uiKit.toaster.cooking('읽은 알림이 모두 제거되었습니다');
              uiKit.popup.destroy();
            }}
            color={'secondary'}
            variant={'contained'}
          >
            삭제
          </Button>
          &nbsp;
          <Button
            onClick={() => {
              uiKit.popup.destroy();
            }}
            color={'primary'}
            variant={'contained'}
          >
            닫기
          </Button>
        </AlignLayout>
      </div>
    );
  };

  removeNotification = async id => {
    const { uiKit, auth } = this.props;
    const { notifications } = this.state;

    //remove
    uiKit.loading.start();
    await removeNotification(auth, id)
      .then(response => {
        this.setState({
          ...this.state,
          count: this.state.count - 1,
          notifications: notifications.filter(n => {
            return n.id !== id;
          })
        });
      })
      .catch(e => {
        uiKit.toaster.cooking(errMsg(e));
      });
    uiKit.loading.end();
  };

  render() {
    const { notifications, count } = this.state;

    return (
      <div>
        <PageTitle title={'알림'} explain={`${count}개의 알림이 있습니다`} />
        <br />
        <AlignLayout align={'right'}>
          <Button
            onClick={this.removeReadNotifications}
            startIcon={<CloseIcon />}
            variant={'contained'}
            color={'secondary'}
          >
            읽은 알림 모두 삭제
          </Button>
        </AlignLayout>
        <br />
        {notifications && (
          <Section
            style={{
              marginTop: 0
            }}
            divideStyle={'fill'}>
            <Tabs
              initActive={'전체'}
              tabs={[
                {
                  label: '전체',
                  startIcon: (<ReorderIcon/>),
                },
                {
                  label: '커뮤니티',
                  startIcon: (<PeopleIcon/>),
                },
                {
                  label: '친구',
                  startIcon: (<PersonAddIcon/>),
                },
                {
                  label: '쪽지',
                  startIcon: (<EmailIcon/>),
                },
                {
                  label: '문의',
                  startIcon: (<QuestionAnswerIcon/>),
                },
              ]}/>
            <br/>
            {notifications.map(notification => {
              return (
                <MenuItem
                  variant={'inherit'}
                  key={randStr(10)}
                  onClick={() => {
                    //TODO: 알림 클릭 시 동작
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
                          this.removeNotification(notification.id);
                        }}
                      />
                    </div>
                  </div>
                </MenuItem>
              );
            })}
          </Section>
        )}
        <br />
      </div>
    );
  }
}

export default quickConnect(Notifications);
