import React, { Component } from 'react';
import PageTitle from '../../../primitive/PageTitle/PageTitle';
import { quickConnect } from '../../../../redux/quick';
import { beautifyDate } from '../../../../utils/utils';
import IconButton from '@material-ui/core/IconButton';
import CardWrapper from '../../../primitive/CardWrapper/CardWrapper';
import { TiUserDelete } from 'react-icons/ti';
import Tooltip from '@material-ui/core/Tooltip';
import { deleteFriend, getFriends } from '../../../../http/tming';
import { errMsg } from '../../../../http/util';
import Address from '../../../primitive/Address/Address';
import AlignLayout from '../../../layouts/AlignLayout/AlignLayout';
import Button from '@material-ui/core/Button';

class Friends extends Component {
  state = {
    friends: null
  };

  componentDidMount() {
    this.loadFriends();
  }

  loadFriends = async () => {
    const { uiKit, auth } = this.props;

    uiKit.loading.start();
    await getFriends(auth)
      .then(response => {
        this.setState({
          ...this.state,
          friends: response.data.data
        });
      })
      .catch(e => {
        uiKit.toaster.cooking(errMsg(e));
      });
    uiKit.loading.end();
  };

  removeFriend = friend_id => {
    const { uiKit, auth } = this.props;
    uiKit.popup.make(
      <div>
        <h4>이 친구를 삭제하시겠습니까?</h4>
        <br />
        <AlignLayout align={'right'}>
          <Button
            onClick={async () => {
              uiKit.loading.start();
              await deleteFriend(auth, friend_id)
                .then(response => {
                  uiKit.toaster.cooking('삭제되었습니다');
                  uiKit.popup.destroy();
                  this.loadFriends();
                })
                .catch(e => {
                  uiKit.toaster.cooking(errMsg(e));
                });
              uiKit.loading.end();
            }}
            color={'secondary'}
            variant={'contained'}
          >
            삭제
          </Button>
          &nbsp;&nbsp;
          <Button
            onClick={() => {
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

  render() {
    const { friends } = this.state;

    return (
      <div>
        <PageTitle align={'left'} title={'친구목록'} explain={'찡구들~안냥~'} />
        <br />
        <CardWrapper>
          {friends && friends.length === 0 && <p>등록된 친구가 없습니다</p>}
          {friends &&
            friends.map(_friend => {
              const friend = _friend.friend;
              return (
                <Address
                  picture={friend.profilePicture}
                  name={friend.username}
                  explain={
                    beautifyDate(friend.createdAt) + '에 친구가 되었습니다'
                  }
                  options={[
                    <Tooltip title={'친구삭제'}>
                      <IconButton
                        onClick={() => {
                          this.removeFriend(_friend.id);
                        }}
                      >
                        <TiUserDelete />
                      </IconButton>
                    </Tooltip>
                  ]}
                />
              );
            })}
        </CardWrapper>
      </div>
    );
  }
}

export default quickConnect(Friends);
