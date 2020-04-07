import React from 'react';
import Section from '../../primitive/Section/Section';
import PageTitle from '../../primitive/PageTitle/PageTitle';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import { quickConnect } from '../../../redux/quick';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import CreateRoom from '../../containers/CreateRoom/CreateRoom';
import CloseIcon from '@material-ui/icons/Close';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const RoomList = ({
  onCreate: handleCreate,
  onJoin: handleJoin,
  rooms,
  uiKit,
  history
}) => {
  const sectionStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignContent: 'space-around',
    flexWrap: 'wrap'
  };
  const cardStyle = {
    flex: 1,
    width: '30%',
    minWidth: '300px',
    margin: '4px'
  };

  const alertEnter = roomId => {
    uiKit.popup.make(
      <div>
        <h3>이 채팅방에 입장하시겠습니까?</h3>
        <br />
        <AlignLayout align="right">
          <Button
            startIcon={<ExitToAppIcon />}
            variant="contained"
            color="primary"
            onClick={handleJoin(roomId)}
          >
            입장
          </Button>
          &nbsp;&nbsp;
          <Button startIcon={<CloseIcon />} onClick={destroyPopup}>
            닫기
          </Button>
        </AlignLayout>
      </div>
    );
  };

  const handleCreateError = error => {
    uiKit.toaster.cooking(error);
  };

  const destroyPopup = () => {
    uiKit.popup.destroy();
  };

  const handleCreateButtonClick = () => {
    uiKit.popup.make(
      <CreateRoom
        onCreate={handleCreate}
        onCreateFail={handleCreateError}
        onCancel={destroyPopup}
      />
    );
  };

  const handleCardClick = roomId => {
    alertEnter(roomId);
  };

  return (
    <div>
      <Section>
        <PageTitle
          title="채팅방"
          explain="채팅방을 만들거나 입장할 수 있어요"
        />
        <AlignLayout align="right">
          <Tooltip title="채팅방 생성">
            <IconButton variant="contained" onClick={handleCreateButtonClick}>
              <AddIcon />
            </IconButton>
          </Tooltip>
          &nbsp;
          <Tooltip title="새로고침">
            <IconButton variant="contained">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </AlignLayout>
      </Section>
      <br />
      {rooms.length > 0 && (
        <Section>
          <div style={sectionStyle}>
            {rooms.map(({ profile, title }) => {
              console.log(profile);
              console.log(title);

              const tags = [
                profile.username,
                profile.gender === 'M' ? '남자' : '여자'
              ];

              return (
                <Card onClick={handleCardClick} style={cardStyle}>
                  <CardActionArea>
                    <CardMedia
                      style={{ height: '128px' }}
                      image={profile.profilePicture}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <h2>{title}</h2>
                      <p className="explain">{tags.map(tag => `#${tag} `)}</p>
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
