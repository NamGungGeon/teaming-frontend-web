import React, {Component} from 'react';
import PageTitle from "../../../primitive/PageTitle/PageTitle";
import {quickConnect} from "../../../redux";
import {delay} from "../../../utils/utils";
import {Card} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardWrapper from "../../../primitive/CardWrapper/CardWrapper";
import ImageView from "../../../primitive/ImageView/ImageView";
import CardActions from "@material-ui/core/CardActions";
import moment from "moment";

import { TiUserDelete } from "react-icons/ti";
import {MdBlock} from 'react-icons/md';
import Tooltip from "@material-ui/core/Tooltip";

class Friends extends Component {
  state={
    friends: null,
  }

  componentDidMount() {
    this.loadFriends();
  }

  loadFriends= async ()=>{
    const {uiKit}= this.props;

    uiKit.loading.start();
    await delay(1000);
    uiKit.loading.end();

    this.setState({
      ...this.state,
      friends: [
        {username: `제이쿼리권위자`, startDate: moment().format('YYYY-MM-DD')},
        {username: `제이쿼리권위자`, startDate: moment().format('YYYY-MM-DD')},
        {username: `제이쿼리권위자`, startDate: moment().format('YYYY-MM-DD')},
        {username: `제이쿼리권위자`, startDate: moment().format('YYYY-MM-DD')},
        {username: `제이쿼리권위자`, startDate: moment().format('YYYY-MM-DD')},
        {username: `제이쿼리권위자`, startDate: moment().format('YYYY-MM-DD')},
        {username: `제이쿼리권위자`, startDate: moment().format('YYYY-MM-DD')},
        {username: `제이쿼리권위자`, startDate: moment().format('YYYY-MM-DD')},
        {username: `제이쿼리권위자`, startDate: moment().format('YYYY-MM-DD')},
      ],
    })
  };

  render() {
    const {friends}= this.state;

    return (
      <div>
        <PageTitle
          align={'left'}
          title={'친구목록'}
          explain={'?명의 친구가 등록되어 있습니다'}/>
        <br/>
        <CardWrapper>
          {
            friends &&
            friends.map(friend=>{
              return (
                <Card>
                  <CardHeader
                    style={{
                      cursor: 'pointer',
                    }}
                    avatar={<ImageView src={friend.profileImage} width={'32px'} height={'32px'}/>}
                    title={friend.username}
                    subheader={friend.startDate+ "에 친구가 되었습니다"}
                  />
                  <CardActions
                    style={{
                      flexDirection: 'row-reverse'
                    }}
                    disableSpacing>
                    <Tooltip title={'차단'}>
                      <IconButton>
                        <MdBlock/>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={'친구삭제'}>
                      <IconButton>
                        <TiUserDelete />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              )
            })
          }
        </CardWrapper>
      </div>
    );
  }
}

export default quickConnect(Friends);