import React, { Component } from 'react';
import { quickConnect } from '../../../redux/quick';
import Comment from '../../primitive/Comment/Comment';
import {
  authorized,
  beautifyDate,
  fuckHTML,
  pageDescription
} from '../../../utils/utils';
import Button from '@material-ui/core/Button';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';
import IconButton from '@material-ui/core/IconButton';
import ReportIcon from '@material-ui/icons/Report';
import CreateIcon from '@material-ui/icons/Create';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';

import { IoIosThumbsDown, IoIosThumbsUp } from 'react-icons/io';
import {
  badToPost,
  createPostComment,
  deleteBoardPost,
  deletePostComment,
  getBoardPost,
  getPostComments,
  goodToPost,
  updatePostComment
} from '../../../http/tming';
import { errMsg } from '../../../http/util';
import { urlQuery } from '../../../utils/url';

import DeleteIcon from '@material-ui/icons/Delete';
import PageTitle from '../../primitive/PageTitle/PageTitle';
import Section from '../../primitive/Section/Section';
import QuickComplain from '../../containers/QuickComplain/QuickComplain';
import { TextField } from '@material-ui/core';
import SearchBox from '../../primitive/SearchBox/SearchBox';
import UserProfileViewer from '../../containers/UserProfileViewer/UserProfileViewer';

class Read extends Component {
  state = {
    id: '',
    content: null,
    comments: null,

    myComment: '',
    imAuthor: false,

    postPw: '',
    commentPw: ''
  };

  async componentDidMount() {
    window.scrollTo(0, 0);

    const { uiKit, match, history } = this.props;
    const { id } = match.params;
    if (!id) {
      history.push('/community');
      return;
    }

    uiKit.loading.start();

    //load post data
    await this.loadPost();
    //load post's comment data
    await this.loadComments();

    uiKit.loading.end();
  }
  componentWillUnmount() {
    pageDescription();
  }
  componentWillUpdate(nextProps, nextState, nextContext) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      (async () => {
        const { uiKit } = nextProps;
        uiKit.loading.start();

        //load post data
        await this.loadPost();
        //load post's comment data
        await this.loadComments();

        uiKit.loading.end();
      })();
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('updated!');
    document.querySelectorAll('oembed[url]').forEach(element => {
      // Create the <a href="..." class="embedly-card"></a> element that Embedly uses
      // to discover the media.
      console.log(element.querySelectorAll('a').length);
      if (element.querySelectorAll('a').length === 0) {
        const anchor = document.createElement('a');

        anchor.setAttribute('href', element.getAttribute('url'));
        anchor.className = 'embedly-card';

        element.innerHTML = '';
        element.append(anchor);
      }
    });
  }

  loadPost = async () => {
    const { uiKit, auth, location, history, match } = this.props;
    const { id } = match.params;
    const query = urlQuery(location);

    uiKit.loading.start();
    //load post data
    await getBoardPost(id)
      .then(response => {
        const { data } = response;
        console.log(data);

        console.log('loadPost', query.category, data.category);
        if (!query.category) {
          history.replace(`/community/read/${id}?category=${data.category}`);
        }

        pageDescription(data.title, fuckHTML(data.body).slice(0, 10));
        this.setState({
          ...this.state,
          content: {
            id: data.id,
            title: data.title,
            content: data.body,
            author: data.author,
            createdAt: data.createdAt,
            likes: data.likes,
            dislikes: data.dislikes,
            views: data.views
          },
          imAuthor: auth
            ? query.category === 'anonymous' || auth.id === data.author.id
            : false
        });
      })
      .catch(e => {
        console.error(e);
        uiKit.toaster.cooking(errMsg(e));
      });
  };

  loadComments = async () => {
    const { uiKit, match } = this.props;
    const { id } = match.params;

    await getPostComments(id)
      .then(response => {
        const { data } = response.data;
        this.setState({
          ...this.state,
          comments: data.map(comment => {
            return {
              id: comment.id,
              author: comment.author,
              text: comment.text,
              createdAt: comment.createdAt,
              picture: comment.author ? comment.author.profilePicture : null
            };
          })
        });
      })
      .catch(e => {
        uiKit.toaster.cooking(errMsg(e));
        console.error(e);
      });
  };

  showUserInfo = (id, username) => {
    if (!id || !username) return;

    const { uiKit } = this.props;
    uiKit.popup.make(<UserProfileViewer username={username} id={id} />);
  };

  deletePost = () => {
    const { history, location, match, uiKit, auth } = this.props;
    const query = urlQuery(location);

    const deletePost = async pw => {
      uiKit.loading.start();
      await deleteBoardPost(auth, match.params.id, pw)
        .then(response => {
          //ok, deleted!
          uiKit.toaster.cooking('삭제되었습니다');
          uiKit.popup.destroy();
          history.push(
            `/community?category=${query.category ? query.category : ''}`
          );
        })
        .catch(e => {
          uiKit.toaster.cooking(errMsg(e));
        });
      uiKit.loading.end();
    };

    uiKit.popup.make(
      <div>
        <h3>이 포스트를 삭제하시겠습니까?</h3>
        <br />
        {this.isAnonymous() && (
          <div>
            <TextField
              fullWidth
              type={'password'}
              placeholder={'글 작성 시 입력했던 비밀번호를 입력하세요'}
              onChange={e => {
                this.setState({
                  ...this.state,
                  postPw: e.target.value
                });
              }}
              color={'primary'}
            />
            <br />
            <br />
          </div>
        )}
        <AlignLayout align={'right'}>
          <Button
            onClick={async () => {
              const { postPw } = this.state;
              if (!postPw && this.isAnonymous()) {
                uiKit.toaster.cooking(
                  '글 작성 시 입력했던 비밀번호를 입력하세요'
                );
                return;
              }
              await deletePost(postPw);
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
            취소
          </Button>
        </AlignLayout>
      </div>
    );
  };

  deleteComment = async (postId, commentId) => {
    const { uiKit, auth } = this.props;

    const remove = async () => {
      const { commentPw } = this.state;
      uiKit.loading.start();
      await deletePostComment(auth, postId, commentId, commentPw)
        .then(response => {
          //ok, deleted!
          this.setState({
            ...this.state,
            commentPw: ''
          });
          uiKit.toaster.cooking('댓글이 삭제되었습니다');
          uiKit.popup.destroy();
          this.loadComments(postId);
        })
        .catch(e => {
          uiKit.toaster.cooking(errMsg(e));
        });
      uiKit.loading.end();
    };

    if (this.isAnonymous()) {
      uiKit.popup.make(
        <div>
          <h4>댓글 삭제</h4>
          <br />
          <TextField
            fullWidth
            placeholder={'댓글 작성 시 입력한 비밀번호를 입력하세요'}
            type={'password'}
            color={'primary'}
            onChange={e => {
              this.setState({
                ...this.state,
                commentPw: e.target.value
              });
            }}
          />
          <br />
          <br />
          <AlignLayout align={'right'}>
            <Button
              startIcon={<DeleteIcon />}
              onClick={remove}
              color={'primary'}
              variant={'contained'}
            >
              삭제
            </Button>
          </AlignLayout>
        </div>
      );
    } else {
      await remove();
    }
  };

  createComment = async () => {
    const { uiKit, auth, match } = this.props;
    if (!this.state.myComment) {
      uiKit.toaster.cooking('댓글은 빈 칸일 수 없습니다');
      return false;
    }

    const id = match.params.id;
    const create = async () => {
      const { myComment, commentPw } = this.state;
      uiKit.loading.start();
      await createPostComment(auth, id, myComment, commentPw)
        .then(response => {
          //reload!
          uiKit.toaster.cooking('댓글이 작성되었습니다');
          this.setState({
            ...this.state,
            myComment: '',
            commentPw: ''
          });
          uiKit.popup.destroy();
          this.loadComments();
        })
        .catch(e => {
          uiKit.toaster.cooking(errMsg(e));
        });
      uiKit.loading.end();
    };

    if (this.isAnonymous()) {
      uiKit.popup.make(
        <div>
          <h4>댓글 비밀번호 설정</h4>
          <br />
          <TextField
            fullWidth
            placeholder={'댓글 수정/삭제에 사용할 비밀번호를 입력하세요'}
            type={'password'}
            color={'primary'}
            onChange={e => {
              this.setState({
                ...this.state,
                commentPw: e.target.value
              });
              console.log(e.target.value);
            }}
          />
          <br />
          <br />
          <AlignLayout align={'right'}>
            <Button onClick={create} color={'primary'} variant={'contained'}>
              작성
            </Button>
          </AlignLayout>
        </div>
      );
    } else {
      await create();
    }

    return true;
  };

  updateComment = async (postId, commentId, text) => {
    const { auth, uiKit } = this.props;
    //do update!

    const update = async () => {
      const { commentPw } = this.state;
      uiKit.loading.start();
      await updatePostComment(auth, postId, commentId, text, commentPw)
        .then(response => {
          //ok updated!
          this.loadComments(postId);
          uiKit.toaster.cooking('수정 완료');
        })
        .catch(e => {
          console.error(e);
          uiKit.toaster.cooking(errMsg(e));
        });
      uiKit.loading.end();
    };

    if (this.isAnonymous()) {
      uiKit.popup.make(
        <div>
          <h4>댓글 수정</h4>
          <br />
          <TextField
            fullWidth
            placeholder={'댓글 작성 시 사용했던 비밀번호를 입력하세요'}
            type={'password'}
            color={'primary'}
            onChange={e => {
              this.setState({
                ...this.state,
                commentPw: e.target.value
              });
            }}
          />
          <br />
          <br />
          <AlignLayout align={'right'}>
            <Button onClick={update} color={'primary'} variant={'contained'}>
              수정
            </Button>
          </AlignLayout>
        </div>
      );
    } else {
      await update();
    }
  };

  good = async () => {
    const { uiKit, auth, match } = this.props;
    const { id } = match.params;

    if (!authorized(auth)) {
      uiKit.toaster.cooking('로그인이 필요합니다');
      return;
    }

    uiKit.loading.start();
    await goodToPost(auth, id)
      .then(response => {
        //ok
        uiKit.toaster.cooking('추천 되었습니다');
        this.loadPost();
      })
      .catch(e => {
        uiKit.toaster.cooking(errMsg(e));
      });
    uiKit.loading.end();
  };
  bad = async () => {
    const { uiKit, auth, match } = this.props;
    const { id } = match.params;

    if (!authorized(auth)) {
      uiKit.toaster.cooking('로그인이 필요합니다');
      return;
    }

    uiKit.loading.start();
    await badToPost(auth, id)
      .then(response => {
        //ok
        uiKit.toaster.cooking('비추천 되었습니다');
        this.loadPost();
      })
      .catch(e => {
        uiKit.toaster.cooking(errMsg(e));
      });
    uiKit.loading.end();
  };

  isAnonymous = () => {
    const query = urlQuery(this.props.location);
    return query.category && query.category.toLowerCase() === 'anonymous';
  };

  render() {
    const {
      history,
      location,
      match,
      uiKit,
      auth,
      contentFilter,
      ContentFilterDispatcher
    } = this.props;
    const { content, comments, imAuthor } = this.state;
    const query = urlQuery(location);

    // TODO PageTitle 부분 <p> 밑에 <div> 태그 들어가있는 부분 수정하기
    return (
      <div>
        {content && (
          <Section>
            <PageTitle
              title={content.title}
              explain={
                <div>
                  <div>작성일: {beautifyDate(content.createdAt)}</div>
                  <div>조회수: {content.views}회</div>
                  <div
                    style={{
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      this.showUserInfo(
                        content.author ? content.author.id : '',
                        content.author ? content.author.username : ''
                      );
                    }}
                  >
                    작성자: {content.author ? content.author.username : '익명'}
                  </div>
                </div>
              }
            />
            <br />
            <p
              className={'reader'}
              dangerouslySetInnerHTML={{ __html: content.content }}
            />
            <br />
            <AlignLayout align={'center'}>
              <Fab onClick={this.good} color={'primary'} variant="extended">
                <IoIosThumbsUp
                  style={{
                    fontSize: '20px'
                  }}
                />
                &nbsp;
                {content.likes}
              </Fab>
              &nbsp;&nbsp;&nbsp;
              <Fab onClick={this.bad} color={'secondary'} variant="extended">
                <IoIosThumbsDown
                  style={{
                    fontSize: '20px'
                  }}
                />
                &nbsp;
                {content.dislikes}
              </Fab>
            </AlignLayout>
            {content && (
              <div>
                <br />
                <AlignLayout align={'right'}>
                  <Tooltip title={'이 글 신고하기'}>
                    <IconButton
                      onClick={() => {
                        uiKit.popup.make(
                          <QuickComplain
                            endpoint={`/boards/${content.id}`}
                            onFinished={() => {
                              ContentFilterDispatcher.hideBoard(content.id);
                              uiKit.toaster.cooking('신고가 완료되었습니다');
                              uiKit.popup.destroy();

                              history.push(
                                `/community?category=${
                                  query.category ? query.category : 'general'
                                }`
                              );
                            }}
                          />
                        );
                      }}
                    >
                      <ReportIcon />
                    </IconButton>
                  </Tooltip>
                  {imAuthor && (
                    <span>
                      <Tooltip title={'글 수정하기'}>
                        <IconButton
                          onClick={() => {
                            history.push(
                              `/community/update/${content.id}?category=${
                                query.category ? query.category : ''
                              }`
                            );
                          }}
                        >
                          <CreateIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={'글 삭제하기'}>
                        <IconButton onClick={this.deletePost}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </span>
                  )}
                </AlignLayout>
              </div>
            )}
          </Section>
        )}
        <br />
        {comments && (
          <Section>
            <p className={'explain'}>{comments.length}개의 댓글이 있습니다</p>
            {authorized(auth) || this.isAnonymous() ? (
              <SearchBox
                hint={'댓글을 작성해보세요'}
                submit={this.createComment}
                onChange={text => {
                  this.setState({
                    ...this.state,
                    myComment: text
                  });
                }}
                buttonContent={'작성'}
              />
            ) : (
              <p>댓글 작성을 위해서는 로그인이 필요합니다</p>
            )}
            <br />
            {comments
              .filter(comment => {
                return !contentFilter.boardComment.find(
                  commentId => commentId === comment.id
                );
              })
              .map(comment => (
                <Comment
                  updateComment={text => {
                    this.updateComment(match.params.id, comment.id, text);
                  }}
                  reportComment={() => {
                    uiKit.popup.make(
                      <QuickComplain
                        endpoint={`/boards/${content.id}/comments/${comment.id}`}
                        onFinished={() => {
                          ContentFilterDispatcher.hideBoardComment(comment.id);
                          uiKit.toaster.cooking('신고가 완료되었습니다');
                          uiKit.popup.destroy();
                        }}
                      />
                    );
                  }}
                  showUserInfo={this.showUserInfo}
                  deleteComment={() => {
                    uiKit.popup.make(
                      <div>
                        <h3>댓글을 삭제하시겠습니까?</h3>
                        <br />
                        <AlignLayout align={'right'}>
                          <Button
                            onClick={async () => {
                              await this.deleteComment(
                                match.params.id,
                                comment.id
                              );
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
                        </AlignLayout>
                      </div>
                    );
                  }}
                  auth={auth}
                  profile={comment.picture}
                  author={comment.author}
                  text={comment.text}
                  createdAt={beautifyDate(comment.createdAt)}
                />
              ))}
          </Section>
        )}
      </div>
    );
  }
}

export default quickConnect(Read);
