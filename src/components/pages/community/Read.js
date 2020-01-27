import React, {Component} from 'react';
import {quickConnect} from "../../../redux/quick";
import Comment from "../../primitive/Comment/Comment";
import {authorized, beautifyDate, delay, momenting, randNum} from "../../../utils/utils";
import {Input, InputGroup, InputGroupAddon} from "reactstrap";
import Button from "@material-ui/core/Button";
import AlignLayout from "../../layouts/AlignLayout/AlignLayout";
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ReportIcon from '@material-ui/icons/Report';
import CreateIcon from '@material-ui/icons/Create';
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";

import { IoIosThumbsDown, IoIosThumbsUp } from "react-icons/io";
import {
  badToPost,
  createPostComment,
  deleteBoardPost,
  deletePostComment,
  getBoardPost,
  getBoardPosts,
  getPostComments, goodToPost, updatePostComment
} from "../../../http/tming";
import {errMsg} from "../../../http/util";
import {getPath, urlQuery} from "../../../utils/url";

import DeleteIcon from '@material-ui/icons/Delete';
import UserInfoViewer from "../../containers/UserInfoViewer/UserInfoViewer";
import PageTitle from "../../primitive/PageTitle/PageTitle";
import Section from "../../primitive/Section/Section";

class Read extends Component {
  state={
    id: '',
    content: null,
    comments: null,

    myComment: '',
    imAuthor: false,
  }

  async componentDidMount() {
    window.scrollTo(0,0);

    const {uiKit, match} = this.props;
    const {id} = match.params;

    uiKit.loading.start();

    //load post data
    await this.loadPost(id);
    //load post's comment data
    await this.loadComments(id);

    uiKit.loading.end();
  };

  loadPost= async (id)=>{
    const {uiKit, match, auth, location} = this.props;
    const query= urlQuery(location);

    uiKit.loading.start();
    //load post data
    await getBoardPost(id).then(response => {
      const {data} = response;
      console.log(data);
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
          views: data.views,
        },
        imAuthor: auth ? (query.category=== 'anonymous' || auth.id === data.author.id) : false,
      });
    }).catch(e => {
      console.log(e);
      uiKit.toaster.cooking(errMsg(e));
    });
  };

  loadComments= async (id)=>{
    const {uiKit}= this.props;

    await getPostComments(id).then(response => {
      const {data} = response.data;
      this.setState({
        ...this.state,
        comments: data.map(comment => {
          return {
            id: comment.id,
            author: comment.author,
            text: comment.text,
            createdAt: comment.createdAt,
            picture: comment.author.profilePicture,
          }
        })
      })
    }).catch(e => {
      uiKit.toaster.cooking(errMsg(e));
    });
  }


  showUserInfo= (id, username)=>{
    const {uiKit}= this.props;
    uiKit.popup.make((
      <UserInfoViewer username={username} id={id}/>
    ));
  };

  deletePost= ()=>{
    const {history, location, match, uiKit, auth}= this.props;
    const query= urlQuery(location);

    uiKit.popup.make((
      <div>
        <h5>이 포스트를 삭제하시겠습니까?</h5>
        <br/>
        <AlignLayout align={'right'}>
          <Button
            onClick={async ()=>{
              uiKit.loading.start();
              await deleteBoardPost(auth, match.params.id).then(response=>{
                //ok, deleted!
                uiKit.toaster.cooking('삭제되었습니다');
                uiKit.popup.destroy();
                history.push(getPath(`/community?category=${query.category? query.category: ''}`))
              }).catch(e=>{
                uiKit.toaster.cooking(errMsg(e));
              });
            }}
            variant={'contained'}
            color={'primary'}>
            삭제
          </Button>
          &nbsp;&nbsp;
          <Button
            onClick={()=>{
              uiKit.popup.destroy();
            }}
            variant={'contained'}
            color={'secondary'}>
            취소
          </Button>
        </AlignLayout>
      </div>
    ))
  };

  deleteComment= async (postId, commentId)=>{
    const {uiKit, auth}= this.props;
    uiKit.loading.start();
    await deletePostComment(auth, postId, commentId).then(response=>{
      //ok, deleted!
      uiKit.toaster.cooking('댓글이 삭제되었습니다');
      uiKit.popup.destroy();
      this.loadComments(postId);
    }).catch(e=>{
      uiKit.toaster.cooking(errMsg(e));
    });
    uiKit.loading.end();
  };

  createComment= async ()=>{
    const {uiKit, auth, match}= this.props;
    const {myComment}= this.state;

    const id= match.params.id;

    if(!authorized(auth)){
      uiKit.toaster.cooking('로그인이 필요합니다');
      return;
    }

    uiKit.loading.start();
    await createPostComment(auth, id, myComment).then(response=>{
      //reload!
      uiKit.toaster.cooking('댓글이 작성되었습니다');
      this.setState({
        ...this.state,
        myComment: '',
      });
      this.componentDidMount();
    }).catch(e=>{
      uiKit.toaster.cooking(errMsg(e));
    });
    uiKit.loading.end();
  };

  updateComment= async (postId, commentId, text)=>{
    const {auth, uiKit}= this.props;
    //do update!

    uiKit.loading.start();
    await updatePostComment(auth, postId, commentId, text).then(response=>{
      //ok updated!
      this.loadComments(postId);
      uiKit.toaster.cooking('수정 완료');
    }).catch(e=>{
      uiKit.toaster.cooking(errMsg(e));
    });
    uiKit.loading.end();
  };

  good= async ()=>{
    const {uiKit, auth, match}= this.props;
    const {id}= match.params;

    if(!authorized(auth)){
      uiKit.toaster.cooking('로그인이 필요합니다');
      return;
    }

    uiKit.loading.start();
    await goodToPost(auth, id).then(response=>{
      //ok
      uiKit.toaster.cooking('추천 되었습니다');
      this.loadPost(id);
    }).catch(e=>{
      uiKit.toaster.cooking(errMsg(e));
    });
    uiKit.loading.end();
  };
  bad= async ()=>{
    const {uiKit, auth, match}= this.props;
    const {id}= match.params;

    if(!authorized(auth)){
      uiKit.toaster.cooking('로그인이 필요합니다');
      return;
    }

    uiKit.loading.start();
    await badToPost(auth, id).then(response=>{
      //ok
      uiKit.toaster.cooking('비추천 되었습니다');
      this.loadPost(id);
    }).catch(e=>{
      uiKit.toaster.cooking(errMsg(e));
    });
    uiKit.loading.end();
  };


  render() {
    const {history, location, match, uiKit, auth}= this.props;
    const {content, comments, imAuthor}= this.state;
    const query= urlQuery(location);

    return (
      <div>
        {
          content && (
            <Section>
              <PageTitle
                title={content.title}
                explain={(
                  <div>
                    <div>
                      작성일: {beautifyDate(content.createdAt)}
                    </div>
                    <div>
                      조회수: {content.views}회
                    </div>
                    <div
                      style={{
                        cursor: 'pointer',
                      }}
                      onClick={()=>{
                        this.showUserInfo(content.author.id, content.author.username);
                      }}>
                      작성자: {content.author? content.author.username: '익명'}
                    </div>
                  </div>
                )}/>
              <br/>
              <p
                className={'reader'}
                dangerouslySetInnerHTML={ {__html: content.content}}/>
              <br/>
              <AlignLayout align={'center'}>
                <Fab
                  onClick={this.good}
                  color={'primary'}
                  variant="extended">
                  <IoIosThumbsUp style={{
                    fontSize: '20px'
                  }}/>
                  &nbsp;
                  {content.likes}
                </Fab>
                &nbsp;&nbsp;&nbsp;
                <Fab
                  onClick={this.bad}
                  color={'secondary'}
                  variant="extended">
                  <IoIosThumbsDown style={{
                    fontSize: '20px'
                  }}/>
                  &nbsp;
                  {content.dislikes}
                </Fab>
              </AlignLayout>
              {
                content && (
                  <div>
                    <br/>
                    <AlignLayout align={'right'}>
                      <Tooltip title={'이 글 신고하기'}>
                        <IconButton>
                          <ReportIcon/>
                        </IconButton>
                      </Tooltip>
                      {
                        imAuthor && (
                          <span>
                      <Tooltip title={'글 수정하기'}>
                        <IconButton
                          onClick={()=>{
                            history.push(getPath(`/community/update/${content.id}?category=${query.category? query.category: ''}`));
                          }}>
                          <CreateIcon/>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={'글 삭제하기'}>
                        <IconButton
                          onClick={this.deletePost}>
                          <DeleteIcon/>
                        </IconButton>
                      </Tooltip>
                    </span>
                        )
                      }
                    </AlignLayout>
                  </div>
                )
              }
            </Section>
          )
        }
        <br/>
        {
          comments && (
            <Section>
              <p className={'explain'}>
                {comments.length}개의 댓글이 있습니다
              </p>
              {
                authorized(auth) ? (
                  <InputGroup>
                    <Input
                      value={this.state.myComment}
                      className={'transparent'}
                      type="text"
                      placeholder="댓글을 작성해보세요"
                      onKeyDown={e=>{
                        if(e.key=== 'Enter'){
                          this.createComment();
                          e.preventDefault();
                        }
                      }}
                      onChange={e=>{
                        this.setState({
                          ...this.state,
                          myComment: e.target.value,
                        });
                      }}/>
                    <InputGroupAddon addonType="append">
                      <Button
                        onClick={this.createComment}
                        variant="contained"
                        color="primary">
                        작성
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                ):(
                  <p>
                    댓글 작성을 위해서는 로그인이 필요합니다
                  </p>
                )
              }
              <br/>
              {
                comments.map(comment=>
                  (
                    <Comment
                      updateComment={(text)=>{
                        this.updateComment(match.params.id, comment.id, text);
                      }}
                      showUserInfo={this.showUserInfo}
                      deleteComment={()=>{
                        uiKit.popup.make((
                          <div>
                            <h5>댓글을 삭제하시겠습니까?</h5>
                            <br/>
                            <AlignLayout align={'right'}>
                              <Button
                                onClick={async ()=>{
                                  await this.deleteComment(match.params.id, comment.id);
                                }}
                                variant={'contained'}
                                color={'primary'}>
                                삭제
                              </Button>
                              &nbsp;&nbsp;
                              <Button
                                onClick={()=>{
                                  uiKit.popup.destroy();
                                }}
                                variant={'contained'}
                                color={'secondary'}>
                                닫기
                              </Button>
                            </AlignLayout>
                          </div>
                        ));
                      }}
                      auth={auth}
                      profile={comment.picture}
                      author={comment.author}
                      text={comment.text}
                      createdAt={beautifyDate(comment.createdAt)}/>
                  )
                )
              }
            </Section>)
        }
      </div>
    );
  }
}

export default quickConnect(Read);