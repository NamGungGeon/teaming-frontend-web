import React, {Component} from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ImageIcon from '@material-ui/icons/Image';
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import PageTitle from "../../../primitive/PageTitle/PageTitle";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import {quickConnect} from "../../../redux";
import {delay, randStr} from "../../../utils/utils";

import logo from '../../../resource/logo_white.png';
import ImageView from "../../../primitive/ImageView/ImageView";
import moment from "moment";
import AlignLayout from "../../../layouts/AlignLayout/AlignLayout";
import RefreshIcon from "@material-ui/core/SvgIcon/SvgIcon";
import CheckIcon from '@material-ui/icons/Check';
import Button from "@material-ui/core/Button";

class Message extends Component {
  state={
    messages: null,
  };

  componentDidMount() {
    this.loadMessages();
  }
  componentWillUnmount() {
    this.props.uiKit.destroyAll();
  }

  loadMessages= async ()=>{
    const {uiKit}= this.props;

    uiKit.loading.start();
    await delay(1000).then(response=>{
      this.setState({
        ...this.state,
        messages: [
          {
            title: `테스트 쪽지 ${randStr(5)}`,
            username: '제이쿼리권위자',
            profileImage: logo,
            id: randStr(10),
            sendDate: moment().format("YYYY-MM-DD hh:mm"),
          },
          {
            title: `테스트 쪽지 ${randStr(5)}`,
            username: '제이쿼리권위자',
            profileImage: logo,
            id: randStr(10),
            sendDate: moment().format("YYYY-MM-DD hh:mm"),
            read: true,
          },
          {
            title: `테스트 쪽지 ${randStr(5)}`,
            username: '제이쿼리권위자',
            profileImage: logo,
            id: randStr(10),
            sendDate: moment().format("YYYY-MM-DD hh:mm"),
            read: true,
          },
        ],
      })
    });
    uiKit.loading.end();
  };

  readMessage= async (idx)=>{
    const {uiKit}= this.props;

    uiKit.loading.start();
    await delay(500);
    const openMsg= {
        title: `테스트 쪽지 ${randStr(5)}`,
        username: '제이쿼리권위자',
        profileImage: logo,
        id: randStr(10),
        text: randStr(200),
        sendDate: moment().format("YYYY-MM-DD hh:mm"),
    };
    uiKit.popup.make((
      <div>
        <h5>{openMsg.title}</h5>
        <p className={'explain'}>
          {openMsg.username}&nbsp;({openMsg.sendDate})
        </p>
        <br/>
        <p>
          {openMsg.text}
        </p>
        <br/>
        <AlignLayout align={'right'}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<DeleteIcon />}
            onClick={()=>{
            }}>
            답장
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={()=>{
              this.deleteMessage(openMsg.id);
            }}>
            삭제
          </Button>
        </AlignLayout>
      </div>
    ));
    uiKit.loading.end();
  };

  deleteMessage= (id)=>{
    //really wanna remove?
    const {uiKit}= this.props;
    uiKit.popup.make((
      <div>
        <h5>이 쪽지를 정말 삭제하시겠습니까?</h5>
        <br/>
        <AlignLayout align={'right'}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={async ()=>{
              //do remove
              uiKit.loading.start();
              await delay(1000);
              uiKit.loading.end();
              uiKit.popup.destroy();
              uiKit.toaster.cooking('삭제되었습니다');

              //reload
              this.loadMessages();
            }}>
            삭제
          </Button>
        </AlignLayout>
      </div>
    ));
  }

  render() {
    const {messages}= this.state;

    return (
      <div>
        <PageTitle
          align={'left'}
          title={'쪽지함'}
          explain={`${messages? `${messages.length}개의 쪽지가 있습니다`: '내가 받은 쪽지함입니다'}`}/>
        <br/>
        <AlignLayout align={'left'}>
          <Button
            variant="contained"
            color="primary">
            쪽지 보내기
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="contained"
            color="secondary">
            새로고침
          </Button>
        </AlignLayout>
        <br/>
        {
          messages &&
          (
            <List style={{
              backgroundColor: '#333333'
            }}>
              {
                messages.map(msg=>{
                  return (
                    <ListItem >
                      <ListItemAvatar>
                        <Avatar>
                          <ImageView
                            width={'32px'}
                            height={'32px'}
                            src={msg.profileImage}/>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        style={{
                          cursor: 'pointer',
                          color: msg.read? '#ffffff99!important': 'white',
                        }}
                        onClick={()=>{
                          this.readMessage(msg.id);
                        }}
                        primary={
                          <div style={{
                            color: msg.read? 'gray': 'white',
                          }}>
                            {msg.title}
                          </div>
                        }
                        secondary={`${msg.username} (${msg.sendDate})`} />
                      <ListItemSecondaryAction>
                        <IconButton
                          onClick={()=>{
                            this.deleteMessage(msg.id);
                          }}
                          edge="end"
                          aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })
              }
            </List>
          )
        }
      </div>
    );
  }
}

export default quickConnect(Message);