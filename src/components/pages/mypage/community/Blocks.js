import React, {Component} from 'react';
import {delay} from "../../../utils/utils";
import moment from "moment";
import PageTitle from "../../../primitive/PageTitle/PageTitle";
import CardWrapper from "../../../primitive/CardWrapper/CardWrapper";
import {Card} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import {quickConnect} from "../../../redux";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import {MdPersonAdd} from 'react-icons/md';

class Blocks extends Component {  state={
  blocks: null,
}

  componentDidMount() {
    this.loadBlocks();
  }

  loadBlocks= async ()=>{
    const {uiKit}= this.props;

    uiKit.loading.start();
    await delay(1000);
    uiKit.loading.end();

    this.setState({
      ...this.state,
      blocks: [
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
    const {blocks}= this.state;

    return (
      <div>
        <PageTitle
          align={'left'}
          title={'차단목록'}
          explain={'?명의 유저가 차단되어 있습니다'}/>
        <br/>
        <CardWrapper>
          {
            blocks &&
            blocks.map(friend=>{
              return (
                <Card>
                  <CardHeader
                    avatar={<Avatar>X</Avatar>}
                    title={friend.username}
                    subheader={friend.startDate+ "에 차단한 유저입니다"}
                  />
                  <CardActions
                    style={{
                      flexDirection: 'row-reverse'
                    }}
                    disableSpacing>
                    <Tooltip title={'차단해제'}>
                      <IconButton>
                        <MdPersonAdd/>
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

export default quickConnect(Blocks);