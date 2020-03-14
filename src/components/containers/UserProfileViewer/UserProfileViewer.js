import React, { useEffect, useState } from 'react';
import { quickConnect } from '../../../redux/quick';
import {
  createBlock,
  getUserProfile,
  requestFriend
} from '../../../http/tming';
import { errMsg } from '../../../http/util';
import ImageView from '../../primitive/ImageView/ImageView';
import Optional from '../../primitive/Optional/Optional';
import { authorized } from '../../../utils/utils';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';
import Button from '@material-ui/core/Button';

import AddIcon from '@material-ui/icons/Add';
import BlockIcon from '@material-ui/icons/Block';
import SendIcon from '@material-ui/icons/Send';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MessageSender from '../MessageSender/MessageSender';
import Spinner from '../../primitive/Spinner/Spinner';

const UserProfileViewer = ({ auth, uiKit, id }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    (async () => {
      //anonymous member
      if (!id) return;
      //authorized member=
      await getUserProfile(auth, id)
        .then(response => {
          const { data } = response;
          console.log('user profile', data);
          setUser(data);
        })
        .catch(e => {
          uiKit.toaster.cooking(errMsg(e));
        });
    })();
  }, []);

  const requestFriends = async () => {
    uiKit.loading.start();
    await requestFriend(auth, id)
      .then(response => {
        //ok
        uiKit.toaster.cooking('친구 요청이 발송되었습니다');
      })
      .catch(e => {
        uiKit.toaster.cooking(errMsg(e));
      });

    uiKit.loading.end();
  };
  const blockUser = async () => {
    uiKit.loading.start();
    await createBlock(auth, id)
      .then(response => {
        //ok
        uiKit.toaster.cooking('해당 유저가 차단되었습니다');
      })
      .catch(e => {
        uiKit.toaster.cooking(errMsg(e));
      });
    uiKit.loading.end();
  };

  if (!id) return <h3>익명 유저</h3>;
  return (
    <div>
      {user ? (
        <div>
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
            <h3>{user.username}</h3>
          </div>

          <Optional visible={authorized(auth)}>
            <br />
            <AlignLayout align={'right'}>
              <Button
                startIcon={<SendIcon />}
                variant={'contained'}
                color={'primary'}
                onClick={() => {
                  uiKit.popup.make(
                    <MessageSender
                      id={user.id}
                      username={user.username}
                      onClose={() => {
                        uiKit.popup.destroy();
                      }}
                    />
                  );
                }}
              >
                쪽지 보내기
              </Button>
              &nbsp;&nbsp;
              {user.isFriends ? (
                <Button startIcon={<PersonAddIcon />} variant={'contained'}>
                  친구입니다
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    requestFriends();
                  }}
                  startIcon={<AddIcon />}
                  variant={'contained'}
                  color={'primary'}
                >
                  친구추가
                </Button>
              )}
              &nbsp;&nbsp;
              {user.isBlocked ? (
                <Button startIcon={<BlockIcon />} variant={'contained'}>
                  차단한 유저
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    blockUser();
                  }}
                  startIcon={<BlockIcon />}
                  variant={'contained'}
                  color={'secondary'}
                >
                  차단
                </Button>
              )}
            </AlignLayout>
          </Optional>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default quickConnect(UserProfileViewer);
