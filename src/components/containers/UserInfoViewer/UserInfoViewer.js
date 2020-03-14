import React, { Component } from 'react';
import { quickConnect } from '../../../redux/quick';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';
import Button from '@material-ui/core/Button';
import {
  createBlock,
  createMessage,
  getUserProfile,
  requestFriend
} from '../../../http/tming';
import { errMsg } from '../../../http/util';
import Optional from '../../primitive/Optional/Optional';
import { authorized } from '../../../utils/utils';
import AddIcon from '@material-ui/icons/Add';
import BlockIcon from '@material-ui/icons/Block';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import { TextField } from '@material-ui/core';
import HashTable from '../../primitive/HashTable/HashTable';
import ImageView from '../../primitive/ImageView/ImageView';

class UserInfoViewer extends Component {
  state = {
    user: null,

    newMsg: ''
  };

  async componentDidMount() {
    const { uiKit, auth, id } = this.props;
    if (!id) return;

    uiKit.loading.start();
    await getUserProfile(auth, id)
      .then(response => {
        const { data } = response;
        console.log('user profile', data);
        this.setState({
          ...this.state,
          user: data
        });
      })
      .catch(e => {
        uiKit.toaster.cooking(errMsg(e));
      });
    uiKit.loading.end();
  }

  requestFriends = async () => {
    const { uiKit, auth, id } = this.props;
    uiKit.loading.start();
    await requestFriend(auth, id)
      .then(response => {
        //ok
        uiKit.toaster.cooking('친구 요청이 발송되었습니다');
        uiKit.popup.destroy();
      })
      .catch(e => {
        uiKit.toaster.cooking(errMsg(e));
      });

    uiKit.loading.end();
  };
  blockUser = async () => {
    const { uiKit, auth, id } = this.props;
    uiKit.loading.start();
    await createBlock(auth, id)
      .then(response => {
        //ok
        uiKit.toaster.cooking('해당 유저가 차단되었습니다');
        uiKit.popup.destroy();
      })
      .catch(e => {
        uiKit.toaster.cooking(errMsg(e));
      });
    uiKit.loading.end();
  };

  sendMessage = () => {
    const { uiKit, auth, id, username } = this.props;
    uiKit.spopup.make(
      <div>
        <h3>
          쪽지
          <p className={'explain'}>{username}</p>
          <TextField
            fullWidth
            multiline
            rows={10}
            maxlength={300}
            type={'textarea'}
            style={{ height: '300px' }}
            onChange={e => {
              const msg = e.target.value;
              console.log(msg);
              this.setState({
                ...this.state,
                newMsg: msg
              });
            }}
            placeholder={'내용을 입력하세요'}
          />
        </h3>
        <br />
        <AlignLayout align={'right'}>
          <Button
            startIcon={<SendIcon />}
            onClick={async () => {
              uiKit.loading.start();
              await createMessage(auth, id, this.state.newMsg)
                .then(response => {
                  //ok
                  uiKit.toaster.cooking('성공적으로 발송되었습니다');
                  uiKit.spopup.destroy();
                })
                .catch(e => {
                  uiKit.toaster.cooking(errMsg(e));
                });
              uiKit.loading.end();
            }}
            variant={'contained'}
            color={'primary'}
          >
            보내기
          </Button>
          &nbsp;&nbsp;
          <Button
            startIcon={<CloseIcon />}
            onClick={() => {
              uiKit.spopup.destroy();
            }}
            variant={'contained'}
            color={'secondary'}
          >
            닫기
          </Button>
        </AlignLayout>
      </div>
    );
  };

  render() {
    const { username, auth, id } = this.props;
    const { user } = this.state;
    return (
      <div>
        {user ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ImageView
              style={{
                maxWidth: '64px',
                maxHeight: '64px',
                width: 'auto'
              }}
              img={user.profilePicture}
            />
            &nbsp;&nbsp;
            <h3>{username}</h3>
          </div>
        ) : (
          <h3>{username}</h3>
        )}
        <Optional visible={authorized(auth)}>
          <br />
          <AlignLayout align={'right'}>
            <Button
              startIcon={<SendIcon />}
              variant={'contained'}
              color={'primary'}
              onClick={this.sendMessage}
            >
              쪽지 보내기
            </Button>
            &nbsp;&nbsp;
            <Button
              startIcon={<AddIcon />}
              variant={'contained'}
              color={'primary'}
              onClick={this.requestFriends}
            >
              친구추가
            </Button>
            &nbsp;&nbsp;
            <Button
              startIcon={<BlockIcon />}
              onClick={this.blockUser}
              variant={'contained'}
              color={'secondary'}
            >
              차단
            </Button>
          </AlignLayout>
        </Optional>
      </div>
    );
  }

  componentWillMount() {
    const { uiKit } = this.props;
    uiKit.destroyAll();
  }
}

export default quickConnect(UserInfoViewer);
