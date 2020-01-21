import React, {Component} from 'react';
import {quickConnect} from "../../redux";
import AlignLayout from "../../layouts/AlignLayout/AlignLayout";
import Button from "@material-ui/core/Button";
import {createBlock, requestFriend} from "../../http/tming";
import {errMsg} from "../../http/util";
import Optional from "../../primitive/Optional/Optional";
import {authorized} from "../../utils/utils";

class UserInfoViewer extends Component {
  state={
    user: null
  };

  requestFriends= async ()=>{
    const {uiKit, auth, id}= this.props;
    uiKit.loading.start();
    await requestFriend(auth, id).then(response=>{
      //ok
      uiKit.toaster.cooking('친구 요청이 발송되었습니다');
      uiKit.popup.destroy();
    }).catch(e=>{
      uiKit.toaster.cooking(errMsg(e));
    })
    uiKit.loading.end();
  };
  blockUser= async ()=>{
    const {uiKit, auth, id}= this.props;
    uiKit.loading.start();
    await createBlock(auth, id).then(response=>{
      //ok
      uiKit.toaster.cooking('해당 유저가 차단되었습니다');
      uiKit.popup.destroy();
    }).catch(e=>{
      uiKit.toaster.cooking(errMsg(e));
    });
    uiKit.loading.end();
  };

  render() {
    const {id, username, uiKit, auth}= this.props;
    return (
      <div>
        <h5>{username}</h5>
        <Optional visible={authorized(auth)}>
          <br/>
          <AlignLayout align={'right'}>
            <Button
              variant={'contained'}
              color={'primary'}
              onClick={this.requestFriends}>
              친구추가
            </Button>
            &nbsp;&nbsp;
            <Button
              onClick={this.blockUser}
              variant={'contained'}
              color={'secondary'}>
              차단
            </Button>
          </AlignLayout>
        </Optional>
      </div>
    );
  }
}

export default quickConnect(UserInfoViewer);