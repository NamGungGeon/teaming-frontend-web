import React, {Component} from 'react';
import IconButton from "@material-ui/core/IconButton";
import {Badge} from "@material-ui/core";
import NotificationsIcon from '@material-ui/icons/Notifications';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {getNotifications, removeNotification} from "../../../http/tming";
import {quickConnect} from "../../../redux/quick";
import {errMsg} from "../../../http/util";
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './Notifications.module.css';
import {randStr} from "../../../utils/utils";
import Typography from "@material-ui/core/Typography";
import AlignLayout from "../../layouts/AlignLayout/AlignLayout";
import getHistory from 'react-router-global-history';
import {getPath} from "../../../utils/url";
import Tooltip from "@material-ui/core/Tooltip";


class Notifications extends Component{
  state={
    notifications: null,
    count: 0,
  };

  refresh= ()=>{
    const {auth}= this.props;

    getNotifications(auth, 8).then(response=>{
      this.setState({
        ...this.state,
        count: response.data.count,
        notifications: response.data.data,
      });

    }).catch(e=>{
      console.log(errMsg(e));
    });
  };
  componentDidMount() {
    this.refresh();
    this.timer= setInterval(this.refresh, 60*1000);
  }
  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  render() {
    const {count, notifications}= this.state;
    const {uiKit, auth}= this.props;
    const history= getHistory();

    return (
      <span>
        <Tooltip title={'알림'}>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={(e)=>{
              if(!notifications){
                uiKit.toaster.cooking('알림 로딩 중 입니다');
                return;
              }

              if(notifications.length=== 0){
                uiKit.toaster.cooking('새로운 알림이 없습니다');
                return;
              }

              console.log(e.currentTarget);
              this.setState({
                ...this.state,
                openOptions: true,
                anchor: e.currentTarget
              })
            }}
          >
          {
            count?
              (
                <Badge
                  className={styles.badge}
                  style={{
                    fontSize: '8px',
                    color: 'white',
                  }}
                  max={9}
                  badgeContent={count}
                  color={'primary'}>
                  <NotificationsIcon/>
                </Badge>
              )
              :
              (
                <NotificationsIcon/>
              )
          }
        </IconButton>
        </Tooltip>
      <Menu
        style={{
          zIndex: 99999,
        }}
        anchorEl={this.state.anchor}
        keepMounted
        open={this.state.openOptions}
        onClose={()=>{
          this.setState({
            ...this.state,
            openOptions: false,
          })
        }}
        PaperProps={{
          style: {
            width: 300,
          },
        }}
      >
        {
          (notifications && notifications.length< count) && (
            <MenuItem
              onClick={()=>{
                history.push(getPath('/mypage/community/notifications'));
              }}
              variant={'inherit'}>
              <AlignLayout align={'center'}>
                <NotificationsIcon/>&nbsp;&nbsp;알림 모두 보기
              </AlignLayout>
            </MenuItem>
          )
        }
        {
          notifications &&
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
      </Menu>
    </span>
    );
  };
};

export default quickConnect(Notifications);