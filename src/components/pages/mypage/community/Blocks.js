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
import {getBlocks} from "../../../http/tming";
import {errMsg} from "../../../http/util";

class Blocks extends Component {  state={
  blocks: null,
}

  componentDidMount() {
    this.loadBlocks();
  }

  loadBlocks= async ()=>{
    const {uiKit, auth}= this.props;

    uiKit.loading.start();
    await getBlocks(auth).then(response=>{
      const {data}= response.data;
      this.setState({
        ...this.state,
        blocks: data,
      });
    }).catch(e=>{
      uiKit.toaster.cooking(errMsg(e));
    })
    uiKit.loading.end();
  };

  render() {
    const {blocks}= this.state;

    return (
      <div>
        <PageTitle
          align={'left'}
          title={'차단목록'}/>
        <br/>
        <CardWrapper>
          {
            (blocks && blocks.length===0) && (
              <p>
                차단한 유저가 없습니다
              </p>
            )
          }
          {
            blocks &&
            blocks.map(block=>{
              return (
                <Card>
                  <CardHeader
                    avatar={<Avatar>X</Avatar>}
                    title={block.friends.username}
                    subheader={block.friends.createdAt+ "에 차단한 유저입니다"}
                  />
                  <CardActions
                    style={{
                      flexDirection: 'row-reverse'
                    }}
                    disableSpacing>
                    <Tooltip title={'차단해제'}>
                      <IconButton
                        onClick={()=>{
                          //TODO: 차단해제 팝업
                        }}>
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