import React, { Component } from 'react';
import styles from './Comment.module.css';
import logo from '../../resource/icon.png';
import IconButton from '@material-ui/core/IconButton';
import { beautifyDate } from '../../../utils/utils';
import Optional from '../Optional/Optional';
import { IoIosPerson } from 'react-icons/io';

import ReportIcon from '@material-ui/icons/Report';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import SearchBox from '../SearchBox/SearchBox';

class Comment extends Component {
  state = {
    newText: this.props.text
  };

  render() {
    const {
      isHide,
      profile,
      author,
      text,
      createdAt,
      auth,
      deleteComment,
      updateComment,
      reportComment,
      showUserInfo
    } = this.props;
    const { updateMode } = this.state;
    if (isHide) return <div />;
    return (
      <div className={styles.wrapper}>
        <div
          onClick={() => {
            if (author) showUserInfo(author.id, author.username);
          }}
          className={styles.profile}
        >
          {!profile || typeof profile === 'string' ? (
            profile ? (
              <img
                src={profile ? profile : logo}
                alt=""
              />
            ) : (
              <IoIosPerson style={{ fontSize: '32px' }} />
            )
          ) : (
            profile
          )}
        </div>
        <div className={styles.contents}>
          <h4
            onClick={() => {
              if (author) showUserInfo(author.id, author.username);
            }}
            style={{
              cursor: 'pointer'
            }}
          >
            {author ? author.username : '익명'}
          </h4>
          {updateMode ? (
            <SearchBox
              initValue={text}
              hint={'댓글을 수정해보세요'}
              submit={newComment => {
                updateComment(newComment);
                this.setState({
                  ...this.state,
                  updateMode: false
                });
              }}
              buttonContent={'수정'}
            />
          ) : (
            <div>{text}</div>
          )}
          <div className={styles.options}>
            <span className={'explain'}>{createdAt}</span>
            <div>
              <Optional visible={!auth || !author || auth.id === author.id}>
                <Tooltip title={'수정'}>
                  <IconButton
                    size={'small'}
                    onClick={() => {
                      this.setState({
                        ...this.state,
                        updateMode: !updateMode
                      });
                    }}
                  >
                    <CreateIcon fontSize={'small'} />
                  </IconButton>
                </Tooltip>
                <Tooltip title={'삭제'}>
                  <IconButton
                    size={'small'}
                    onClick={() => {
                      deleteComment();
                    }}
                  >
                    <DeleteIcon fontSize={'small'} />
                  </IconButton>
                </Tooltip>
              </Optional>
              <Tooltip title={'신고'}>
                <IconButton onClick={reportComment} size={'small'}>
                  <ReportIcon fontSize={'small'} />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Comment.defaultProps = {
  profile: <IoIosPerson style={{ fontSize: '32px' }} />,
  author: null,
  text: '',
  createdAt: beautifyDate(''),
  deleteComment: () => {},
  updateComment: text => {},
  showUserInfo: id => {}
};

export default Comment;
