import React, { Component } from 'react';
import styles from './Threadic.module.css';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';

import { quickConnect } from '../../../redux/quick';
import {
  createTrashComment,
  deleteTrash,
  deleteTrashComment,
  getTrashComments,
  updateTrashComment
} from '../../../http/tming';
import { errMsg } from '../../../http/util';
import moment from 'moment';
import Comment from '../Comment/Comment';
import Section from '../Section/Section';
import Button from '@material-ui/core/Button';
import CommentIcon from '@material-ui/icons/Comment';
import ReportIcon from '@material-ui/icons/Report';
import DeleteIcon from '@material-ui/icons/Delete';
import QuickComplain from '../../containers/QuickComplain/QuickComplain';
import Blinder from '../Blinder/Blinder';
import SearchBox from '../SearchBox/SearchBox';
import { TextField } from '@material-ui/core';

class Threadic extends Component {
  state = {
    isVisible: true,
    password: '',
    myComment: '',
    comments: null,
    openComment: false
  };

  handleCommentState = unfold => {
    if (unfold) this.loadComments();

    this.setState({
      ...this.state,
      openComment: unfold
    });
  };

  componentWillUnmount() {
    const { uiKit } = this.props;
    uiKit.destroyAll();
  }

  loadComments = async () => {
    const { uiKit, id } = this.props;

    uiKit.loading.start();
    await getTrashComments(id)
      .then(response => {
        const { data } = response.data;
        console.log(data);
        this.setState({
          ...this.state,
          comments: data
        });
      })
      .catch(e => {
        uiKit.toaster.cooking(errMsg(e));
      });
    uiKit.loading.end();
  };

  createComment = () => {
    const { uiKit, id } = this.props;
    if (!this.state.myComment) {
      uiKit.toaster.cooking('댓글을 입력하세요');
      return false;
    }

    uiKit.popup.make(
      <div>
        <h5>댓글 수정/삭제에 사용할 비밀번호를 입력하세요</h5>
        <br />
        <TextField
          fullWidth
          size={'small'}
          type={'password'}
          onChange={e => {
            this.setState({
              ...this.state,
              password: e.target.value
            });
          }}
          placeholder={'수정/삭제에 사용할 비밀번호를 입력하세요'}
        />
        <br />
        <br />
        <AlignLayout align={'right'}>
          <Button
            onClick={async () => {
              const { myComment, password } = this.state;
              console.log(this.state);

              if (!password) {
                uiKit.toaster.cooking('비밀번호를 입력하세요');
                return;
              }

              uiKit.loading.start();
              await createTrashComment(password, id, myComment)
                .then(response => {
                  //ok. reload!
                  this.loadComments();
                  uiKit.popup.destroy();
                })
                .catch(e => {
                  uiKit.toaster.cooking(errMsg(e));
                });
              uiKit.loading.end();
            }}
            variant={'contained'}
            color={'primary'}
          >
            작성
          </Button>
          &nbsp;&nbsp;
          <Button
            onClick={() => {
              uiKit.popup.destroy();
            }}
            variant={'contained'}
            color={'secondary'}
          >
            취소
          </Button>
        </AlignLayout>
      </div>
    );

    return true;
  };

  removeComment = replyId => {
    //check auth
    const { id, uiKit } = this.props;

    //open deleting comment popup
    uiKit.popup.make(
      <div>
        <h5>정말 이 댓글을 삭제하시겠습니까?</h5>
        <br />
        <TextField
          size={'small'}
          fullWidth
          type={'password'}
          onChange={e => {
            console.log('changed', e.target.value);
            console.log('changed', this.state);
            this.setState({
              ...this.state,
              password: e.target.value
            });
          }}
          placeholder={'작성 시 입력한 비밀번호를 입력하세요'}
        />
        <br />
        <br />
        <Button
          onClick={async () => {
            const { password } = this.state;

            uiKit.loading.start();
            await deleteTrashComment(password, id, replyId)
              .then(r => {
                //ok, reload!
                uiKit.popup.destroy();
                this.loadComments();
              })
              .catch(e => {
                uiKit.toaster.cooking(errMsg(e));
              });
            uiKit.loading.end();
          }}
          variant={'contained'}
          color={'primary'}
        >
          예, 삭제합니다
        </Button>
        &nbsp;&nbsp;
        <Button
          onClick={() => {
            uiKit.popup.destroy();
          }}
          variant={'contained'}
          color={'secondary'}
        >
          닫기
        </Button>
      </div>
    );
  };

  updateComment = (replyId, text) => {
    //check auth
    const { id, uiKit } = this.props;

    //open deleting comment popup
    uiKit.popup.make(
      <div>
        <h5>댓글 수정</h5>
        <br />
        <TextField
          fullWidth
          size={'small'}
          type={'password'}
          onChange={e => {
            console.log('changed', e.target.value);
            console.log('changed', this.state);
            this.setState({
              ...this.state,
              password: e.target.value
            });
          }}
          placeholder={'작성 시 입력한 비밀번호를 입력하세요'}
        />
        <br />
        <Button
          onClick={async () => {
            const { password } = this.state;

            uiKit.loading.start();
            await updateTrashComment(password, id, replyId, text)
              .then(r => {
                //ok, reload!
                this.setState({
                  ...this.state,
                  password: ''
                });
                uiKit.popup.destroy();
                this.loadComments();
              })
              .catch(e => {
                uiKit.toaster.cooking(errMsg(e));
              });
            uiKit.loading.end();
          }}
          variant={'contained'}
          color={'primary'}
        >
          수정
        </Button>
        &nbsp;&nbsp;
        <Button
          onClick={() => {
            uiKit.popup.destroy();
          }}
          variant={'contained'}
          color={'secondary'}
        >
          닫기
        </Button>
      </div>
    );
  };
  deleteTrash = () => {
    const { uiKit, id } = this.props;

    //open deleting comment popup
    uiKit.popup.make(
      <div>
        <h5>글 삭제</h5>
        <br />
        <TextField
          fullWidth
          size={'small'}
          type={'password'}
          onChange={e => {
            this.setState({
              ...this.state,
              password: e.target.value
            });
          }}
          placeholder={'작성 시 입력한 비밀번호를 입력하세요'}
        />
        <br />
        <br />
        <Button
          startIcon={<DeleteIcon />}
          onClick={async () => {
            const { password } = this.state;

            uiKit.loading.start();
            await deleteTrash(password, id)
              .then(r => {
                //ok, reload!
                this.setState({
                  ...this.state,
                  isVisible: false,
                  password: ''
                });
                uiKit.toaster.cooking('삭제되었습니다');
                uiKit.popup.destroy();
              })
              .catch(e => {
                uiKit.toaster.cooking(errMsg(e));
              });
            uiKit.loading.end();
          }}
          variant={'contained'}
          color={'primary'}
        >
          삭제
        </Button>
        &nbsp;&nbsp;
        <Button
          onClick={() => {
            uiKit.popup.destroy();
          }}
          variant={'contained'}
          color={'secondary'}
        >
          닫기
        </Button>
      </div>
    );
  };

  render() {
    const {
      id,
      user,
      content,
      createdAt,
      uiKit,
      replies,
      contentFilter,
      ContentFilterDispatcher
    } = this.props;
    const { openComment, comments, isVisible } = this.state;
    console.log(content);

    if (!isVisible) return <div />;

    return (
      <Section divideStyle={'fill'} className={styles.wrapper}>
        <div
          onClick={() => {
            this.handleCommentState(!openComment);
          }}
        >
          <h5>
            {user}
            <br />
            <sub>{moment(createdAt, 'YYYY-MM-DDThh:mm:ss.SSS').fromNow()}</sub>
          </h5>
          <br />
          <div>{content}</div>
        </div>
        <AlignLayout align={'right'}>
          <span
            onClick={() => {
              this.handleCommentState(true);
            }}
          >
            <CommentIcon />
            &nbsp;{comments ? comments.length : replies}
          </span>
          &nbsp;&nbsp;
          <span
            onClick={() => {
              uiKit.popup.make(
                <QuickComplain
                  endpoint={`/feelings/${id}`}
                  onFinished={() => {
                    ContentFilterDispatcher.hideTrash(id);
                    uiKit.toaster.cooking('신고가 완료되었습니다');
                    uiKit.popup.destroy();
                  }}
                />
              );
            }}
          >
            <ReportIcon />
            &nbsp;신고
          </span>
          &nbsp;&nbsp;
          <span onClick={this.deleteTrash}>
            <DeleteIcon />
            &nbsp;삭제
          </span>
        </AlignLayout>
        {comments && (
          <div className={styles.comments}>
            <Blinder isBlind={!openComment}>
              <br />
              <div className={styles.create}>
                <SearchBox
                  submit={() => this.createComment()}
                  onChange={text => {
                    console.log(text, this.state);
                    this.setState({
                      ...this.state,
                      myComment: text
                    });
                  }}
                  hint={'댓글을 작성해보세요'}
                  buttonContent={'작성'}
                />
              </div>
              <br />
              {comments
                .filter(comment => {
                  return !contentFilter.trashComment.find(
                    commentId => commentId === comment.id
                  );
                })
                .map(comment => (
                  <Comment
                    reportComment={() => {
                      uiKit.popup.make(
                        <QuickComplain
                          endpoint={`/feelings/${id}/replies/${comment.id}`}
                          onFinished={() => {
                            ContentFilterDispatcher.hideTrashComment(
                              comment.id
                            );
                            uiKit.toaster.cooking('신고가 완료되었습니다');
                            uiKit.popup.destroy();
                          }}
                        />
                      );
                    }}
                    deleteComment={() => {
                      this.removeComment(comment.id);
                    }}
                    updateComment={text => {
                      this.updateComment(comment.id, text);
                    }}
                    text={comment.text}
                    createdAt={'3일 전'}
                  />
                ))}
            </Blinder>
          </div>
        )}
      </Section>
    );
  }
}

Threadic.defaultProps = {
  comments: [],
  user: '익명',
  content: ''
};

export default quickConnect(Threadic);
