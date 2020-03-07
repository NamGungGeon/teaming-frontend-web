import React, { Component } from 'react';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PageTitle from '../../../primitive/PageTitle/PageTitle';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { quickConnect } from '../../../../redux/quick';
import { beautifyDate } from '../../../../utils/utils';

import ImageView from '../../../primitive/ImageView/ImageView';
import AlignLayout from '../../../layouts/AlignLayout/AlignLayout';
import RefreshIcon from '@material-ui/icons/Refresh';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import SendIcon from '@material-ui/icons/Send';
import Section from '../../../primitive/Section/Section';
import {
  createMessage,
  deleteMessage,
  getMessages
} from '../../../../http/tming';
import { errMsg } from '../../../../http/util';
import CloseIcon from '@material-ui/icons/Close';
import { urlQuery } from '../../../../utils/url';
import { TextField } from '@material-ui/core';

class Message extends Component {
  state = {
    messages: null,
    count: 0,
    newMsg: ''
  };

  async componentDidMount() {
    await this.loadMessages();
    const { location } = this.props;
    const { message: messageId } = urlQuery(location);
    if (messageId) {
      this.readMessage(messageId);
    }
  }
  componentWillUnmount() {
    this.props.uiKit.destroyAll();
  }

  loadMessages = async () => {
    const { uiKit, auth } = this.props;

    uiKit.loading.start();
    await getMessages(auth)
      .then(response => {
        const { data } = response;
        this.setState({
          ...this.state,
          count: data.count,
          messages: data.data
        });
      })
      .catch(e => {
        uiKit.toaster.cooking(errMsg(e));
      });
    uiKit.loading.end();
  };

  readMessage = id => {
    const { uiKit } = this.props;
    const { messages } = this.state;

    const msg = messages.find(msg => {
      if (msg.id === id) {
        return msg;
      }
      return null;
    });

    if (!msg) {
      uiKit.toaster.cooking('메시지를 찾을 수 없습니다');
      return;
    }

    uiKit.popup.make(
      <div>
        <h5>{msg.author.username}</h5>
        <p className={'explain'}>{beautifyDate(msg.createdAt)}</p>
        <p>{msg.text}</p>
        <br />
        <AlignLayout align={'right'}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SendIcon />}
            onClick={() => {
              this.sendMessage(msg.author.id, msg.author.username);
            }}
          >
            답장
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={() => {
              this.deleteMessage(msg.id);
            }}
          >
            삭제
          </Button>
        </AlignLayout>
      </div>
    );
  };

  deleteMessage = id => {
    //really wanna remove?
    const { uiKit, auth } = this.props;

    uiKit.popup.make(
      <div>
        <h5>이 쪽지를 정말 삭제하시겠습니까?</h5>
        <br />
        <AlignLayout align={'right'}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={async () => {
              //do remove
              uiKit.loading.start();
              await deleteMessage(auth, id)
                .then(response => {
                  uiKit.popup.destroy();
                  uiKit.toaster.cooking('삭제되었습니다');

                  //reload
                  this.loadMessages();
                })
                .catch(e => {
                  uiKit.toaster.cooking(errMsg(e));
                });
              uiKit.loading.end();
            }}
          >
            삭제
          </Button>
        </AlignLayout>
      </div>
    );
  };

  sendMessage = (target, username) => {
    const { uiKit, auth } = this.props;

    uiKit.spopup.make(
      <div>
        <h5>쪽지</h5>
        <p className={'explain'}>{username}</p>
        <TextField
          fullWidth
          rows={'10'}
          multiline
          maxlength={300}
          type={'textarea'}
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
        <br />
        <br />
        <AlignLayout align={'right'}>
          <Button
            startIcon={<SendIcon />}
            onClick={async () => {
              uiKit.loading.start();
              await createMessage(auth, target, this.state.newMsg)
                .then(response => {
                  //ok
                  uiKit.destroyAll();
                  uiKit.toaster.cooking('성공적으로 발송되었습니다');
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
    const { messages } = this.state;
    return (
      <div>
        <PageTitle
          align={'left'}
          title={'쪽지함'}
          explain={`${
            messages
              ? `${messages.length}개의 쪽지가 있습니다`
              : '내가 받은 쪽지함입니다'
          }`}
        />
        <br />
        <AlignLayout align={'left'}>
          <Button
            onClick={this.loadMessages}
            startIcon={<RefreshIcon />}
            variant="contained"
            color="secondary"
          >
            새로고침
          </Button>
        </AlignLayout>
        <br />
        {messages && messages.length > 0 && (
          <Section>
            <List>
              {messages.map(msg => {
                const { author } = msg;
                return (
                  <MenuItem
                    onClick={() => {
                      this.readMessage(msg.id);
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <ImageView
                          style={{
                            height: '48px',
                            width: '48px'
                          }}
                          img={author.profilePicture}
                        />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      style={{
                        cursor: 'pointer',
                        color: msg.isRead ? '#00000099!important' : 'white'
                      }}
                      primary={
                        <div
                          style={{
                            color: msg.read ? 'gray' : '#333333'
                          }}
                        >
                          {msg.text.length > 10
                            ? msg.text.slice(0, 10) + '...'
                            : msg.text}
                        </div>
                      }
                      secondary={`${author.username} (${beautifyDate(
                        msg.createdAt
                      )})`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        onClick={() => {
                          this.deleteMessage(msg.id);
                        }}
                        edge="end"
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </MenuItem>
                );
              })}
            </List>
          </Section>
        )}
      </div>
    );
  }
}

export default quickConnect(Message);
