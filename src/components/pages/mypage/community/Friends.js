import React, { Component } from 'react';
import PageTitle from '../../../primitive/PageTitle/PageTitle';
import { quickConnect } from '../../../../redux/quick';
import { beautifyDate } from '../../../../utils/utils';
import { Card } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import CardWrapper from '../../../primitive/CardWrapper/CardWrapper';
import ImageView from '../../../primitive/ImageView/ImageView';
import CardActions from '@material-ui/core/CardActions';
import { TiUserDelete } from 'react-icons/ti';
import { MdBlock } from 'react-icons/md';
import Tooltip from '@material-ui/core/Tooltip';
import { getFriends } from '../../../../http/tming';
import { errMsg } from '../../../../http/util';
import CardBody from 'reactstrap/es/CardBody';
import Avatar from '@material-ui/core/Avatar';

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
              const friend = _friend.friends;
              return (
                <Card>
                  <CardHeader
                    style={{
                      cursor: 'pointer'
                    }}
                    avatar={
                      <Avatar
                        style={{
                          backgroundColor: `${
                            friend.gender === 'M' ? 'blue' : 'pink'
                          }`
                        }}
                      >
                        <ImageView
                          src={friend.profilePicture}
                          width={'32px'}
                          height={'32px'}
                        />
                      </Avatar>
                    }
                    title={friend.username}
                    subheader={
                      beautifyDate(friend.createdAt) + '에 친구가 되었습니다'
                    }
                  />
                  <CardBody>
                    친구의 생일: {beautifyDate(friend.birthday)}
                    <br />
                  </CardBody>
                  <CardActions
                    style={{
                      flexDirection: 'row-reverse'
                    }}
                    disableSpacing
                  >
                    <Tooltip title={'차단'}>
                      <IconButton>
                        <MdBlock />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={'친구삭제'}>
                      <IconButton>
                        <TiUserDelete />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              );
            })}
        </CardWrapper>
      </div>
    );
  }
}

export default quickConnect(Friends);
