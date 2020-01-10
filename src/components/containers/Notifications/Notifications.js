import React, {Component} from 'react';
import IconButton from "@material-ui/core/IconButton";
import {Badge} from "@material-ui/core";
import NotificationsIcon from '@material-ui/icons/Notifications';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {getNotifications, removeNotice} from "../../http/tming";
import {quickConnect} from "../../redux";
import {errMsg} from "../../http/util";
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import DeleteIcon from '@material-ui/icons/Delete';

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
  }
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

    return (
      <span>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={(e)=>{
            if(!notifications || notifications.length=== 0){
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
              <Badge badgeContent={count} color={'primary'}>
                <NotificationsIcon/>
              </Badge>
            )
            :
            (
              <NotificationsIcon/>
            )
        }
      </IconButton>
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
          notifications &&
            notifications.map(notification=>{
              return (
                <MenuItem
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}
                  onClick={()=>{
                  }}>
                  <div>
                    {
                      notification.isRead && (<NewReleasesIcon/>)
                    }
                    &nbsp;&nbsp;
                  </div>
                  <div
                    style={{
                      flex: '1',
                    }}>
                    <div>
                      {notification.title}
                    </div>
                    <div className={'explain'}>
                      {notification.body}
                    </div>
                  </div>
                  <div>
                    <DeleteIcon onClick={async ()=>{
                      //remove
                      uiKit.loading.start();
                      await removeNotice(auth, notification.id).then(response=>{
                        //ok, reload!
                        this.refresh();
                      }).catch(e=>{
                        uiKit.toaster.cooking(errMsg(e));
                      })
                      uiKit.loading.end();
                    }}/>
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