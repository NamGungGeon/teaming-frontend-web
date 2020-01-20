import React, {Component} from 'react';
import PageTitle from "../../../primitive/PageTitle/PageTitle";
import {getNotifications, removeNotification} from "../../../http/tming";
import {errMsg} from "../../../http/util";
import {quickConnect} from "../../../redux";
import MenuItem from "@material-ui/core/MenuItem";
import {randStr} from "../../../utils/utils";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from '@material-ui/icons/Delete';
import Menu from "@material-ui/core/Menu";
import Section from "../../../primitive/Section/Section";
import auth from "../../../redux/auth";

class Notifications extends Component {
  state={
    notifications: null,
    count: 0,
  };

  componentDidMount() {
    this.loadNotifications();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(this.state);
  }

  loadNotifications= async ()=> {
    const {auth, uiKit} = this.props;

    uiKit.loading.start();
    await getNotifications(auth, 99999).then(response => {
      if(response.data.count=== 0){
        uiKit.toaster.cooking('알림이 없습니다');
        return;
      }

      this.setState({
        ...this.state,
        count: response.data.count,
        notifications: response.data.data,
      });
    }).catch(e => {
      console.log(errMsg(e));
    });
    uiKit.loading.end();
  };

  render() {
    const {notifications, count}= this.state;
    const {uiKit, auth}= this.props;

    return (
      <div>
        <PageTitle
          title={'알림'}
          explain={`${count}개의 알림이 있습니다`}/>
          <br/>
          {
            notifications && (
              <Section divideStyle={'fill'}>
                {
                  notifications.map(notification=>{
                    return (
                      <MenuItem
                        variant={'inherit'}
                        key={randStr(10)}
                        onClick={()=>{
                          //TODO: 알림 클릭 시 동작
                        }}>
                        <div style={{
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}>
                          <div
                            style={{
                              flex: '1',
                              overflow: 'hidden'
                            }}>
                            <div>
                              {notification.title}
                            </div>
                            <Typography
                              noWrap
                              className={'explain'}>
                              {notification.body}
                            </Typography>
                          </div>
                          <div>
                            <DeleteIcon onClick={async ()=>{
                              //remove
                              uiKit.loading.start();
                              await removeNotification(auth, notification.id).then(response=>{
                                this.setState({
                                  ...this.state,
                                  count: this.state.count-1,
                                  notifications: notifications.filter(n=>{
                                    return n.id!== notification.id;
                                  })
                                })
                              }).catch(e=>{
                                uiKit.toaster.cooking(errMsg(e));
                              });
                              uiKit.loading.end();
                            }}/>
                          </div>
                        </div>
                      </MenuItem>
                    )
                  })
                }
              </Section>
            )
          }
        <br/>
      </div>
    );
  }
}

export default quickConnect(Notifications);