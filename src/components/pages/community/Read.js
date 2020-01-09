import React, {Component} from 'react';
import {quickConnect} from "../../redux";
import Comment from "../../primitive/Comment/Comment";
import {authorized, beautifyDate, delay, randNum} from "../../utils/utils";
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
  createPostComment,
  deleteBoardPost,
  deletePostComment,
  getBoardPost,
  getBoardPosts,
  getPostComments, updatePostComment
} from "../../http/tming";
import {errMsg} from "../../http/util";
import {getPath, urlQuery} from "../../utils/url";

import DeleteIcon from '@material-ui/icons/Delete';
import UserInfoViewer from "../../containers/UserInfoViewer/UserInfoViewer";

class Read extends Component {
  state={
    id: '',
    content: null,
    comments: null,

    myComment: '',
    imAuthor: false,
  }

  async componentDidMount() {
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
    const {uiKit, match, auth} = this.props;

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
          createDate: data.createdAt,
        },
        imAuthor: auth ? (auth.id === data.author.id) : false,
      });
    }).catch(e => {
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


  showUserInfo= (id)=>{
    const {uiKit}= this.props;
    uiKit.popup.make((
      <UserInfoViewer id={id}/>
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
    const {uiKit, auth, refresher}= this.props;
    uiKit.loading.start();
    await deletePostComment(auth, postId, commentId).then(response=>{
      //ok, deleted!
      uiKit.toaster.cooking('댓글이 삭제되었습니다');
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
      this.loadPost(postId);
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
            <div>
              <h4>{content.title}</h4>
              <p
                onClick={()=>{
                  this.showUserInfo(content.author.id);
                }}
                style={{
                  cursor: 'pointer'
                }}
                className={'explain'}>
                {content.author.username}
              </p>
              <br/>
              <p dangerouslySetInnerHTML={ {__html: content.content}}/>
              <br/>
              <AlignLayout align={'center'}>
                <Fab color={'primary'} variant="extended">
                  <IoIosThumbsUp style={{
                    fontSize: '20px'
                  }}/>
                  &nbsp;
                  유용합니다
                </Fab>
                &nbsp;&nbsp;&nbsp;
                <Fab color={'secondary'} variant="extended">
                  <IoIosThumbsDown style={{
                    fontSize: '20px'
                  }}/>
                  &nbsp;
                  별로군요
                </Fab>
              </AlignLayout>
            </div>
          )
        }
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
        <br/><br/>
        {
          comments && (
            <div>
              {
                authorized(auth) && (
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
                )
              }
              <br/>
              <p className={'explain'}>
                {comments.length}개의 댓글이 있습니다
              </p>
              {
                comments.map(comment=>
                  (
                    <Comment
                      updateComment={this.updateComment}
                      deleteComment={this.deleteComment}
                      commentId={comment.id}
                      postId={match.params.id}
                      profile={comment.picture}
                      author={comment.author}
                      text={comment.text}
                      createdAt={beautifyDate(comment.createdAt)}/>
                  )
                )
              }
            </div>)
        }
      </div>
    );
  }
}

export default quickConnect(Read);