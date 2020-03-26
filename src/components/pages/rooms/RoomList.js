import React, { useEffect, useState } from 'react';
import Section from '../../primitive/Section/Section';
import PageTitle from '../../primitive/PageTitle/PageTitle';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchIcon from '@material-ui/icons/Search';
import { quickConnect } from '../../../redux/quick';
import { delay, randStr } from '../../../utils/utils';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import CreateRoom from '../../containers/CreateRoom/CreateRoom';
import CloseIcon from '@material-ui/icons/Close';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const RoomList = ({ uiKit, history }) => {
  const [rooms, setRooms] = useState();
  const loadRoomList = async () => {
    uiKit.loading.start();
    await delay(1000);
    setRooms([
      {
        roomId: randStr(15),
        profile: {
          nickname: '제이쿼리맹신자',
          profilePicture:
            'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
          gender: 'M'
        },
        title: randStr(8)
      },
      {
        roomId: randStr(15),
        profile: {
          nickname: '제이쿼리배신자',
          profilePicture:
            'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
          gender: 'F'
        },
        title: randStr(8)
      },
      {
        roomId: randStr(15),
        profile: {
          nickname: '제이쿼리배신자',
          profilePicture:
            'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
          gender: 'M'
        },
        title: randStr(8)
      },
      {
        roomId: randStr(15),
        profile: {
          nickname: '제이쿼리배신자',
          profilePicture:
            'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
          gender: 'M'
        },
        title: randStr(8)
      },
      {
        roomId: randStr(15),
        profile: {
          nickname: '제이쿼리배신자',
          profilePicture:
            'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
          gender: 'M'
        },
        title: randStr(8)
      },
      {
        roomId: randStr(15),
        profile: {
          nickname: '제이쿼리배신자',
          profilePicture:
            'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
          gender: 'M'
        },
        title: randStr(8)
      }
    ]);
    uiKit.loading.end();
  };
  const alertEnter = roomId => {
    uiKit.popup.make(
      <div>
        <h3>이 채팅방에 입장하시겠습니까?</h3>
        <br />
        <AlignLayout align={'right'}>
          <Button
            startIcon={<ExitToAppIcon />}
            variant={'contained'}
            color={'primary'}
            onClick={() => {
              uiKit.popup.destroy();
              history.push(`/rooms/${roomId}`);
            }}
          >
            입장
          </Button>
          &nbsp;&nbsp;
          <Button
            startIcon={<CloseIcon />}
            onClick={() => {
              uiKit.popup.destroy();
            }}
          >
            닫기
          </Button>
        </AlignLayout>
      </div>
    );
  };
  useEffect(() => {
    loadRoomList();
    return () => {
      uiKit.destroyAll();
    };
  }, []);
  return (
    <div>
      <Section>
        <PageTitle
          title={'채팅방'}
          explain={'채팅방을 만들거나 입장할 수 있어요'}
        />
        <AlignLayout align={'right'}>
          <Tooltip title={'채팅방 생성'}>
            <IconButton
              onClick={() => {
                uiKit.popup.make(
                  <CreateRoom
                    onCreate={roomId => {
                      uiKit.popup.destroy();
                      history.push(`/rooms/${roomId}`);
                    }}
                    onCreateFail={e => {
                      uiKit.toaster.cooking(e);
                    }}
                    onCancel={() => {
                      uiKit.popup.destroy();
                    }}
                  />
                );
              }}
              variant="contained"
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
          &nbsp;
          <Tooltip title={'새로고침'}>
            <IconButton onClick={loadRoomList} variant="contained">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </AlignLayout>
      </Section>
      <br />
      {rooms && (
        <Section>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignContent: 'space-around',
              flexWrap: 'wrap'
            }}
          >
            {rooms.map(room => {
              const { profile } = room;
              const tags = [
                profile.nickname,
                profile.gender === 'M' ? '남자' : '여자'
              ];
              return (
                <Card
                  onClick={() => {
                    alertEnter(room.roomId);
                  }}
                  style={{
                    flex: 1,
                    width: '30%',
                    minWidth: '300px',
                    margin: '4px'
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      style={{
                        height: '128px'
                      }}
                      image={room.profile.profilePicture}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <h2>{room.title}</h2>
                      <p className={'explain'}>
                        {tags.map(tag => {
                          return `#${tag} `;
                        })}
                      </p>
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })}
          </div>
        </Section>
      )}
    </div>
  );
};

export default quickConnect(RoomList);
