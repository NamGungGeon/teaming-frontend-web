import React, {Component} from 'react';
import {quickConnect} from "../../redux";
import Comment from "../../primitive/Comment/Comment";
import {delay, randNum} from "../../utils/utils";
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
import {deleteBoardPost, getBoardPost, getBoardPosts} from "../../http/tming";
import {errMsg} from "../../http/util";
import {getPath, urlQuery} from "../../utils/url";

import DeleteIcon from '@material-ui/icons/Delete';

class Read extends Component {
  state={
    id: '',
    content: null,
    comments: null,

    myComment: '',
    imAuthor: false,
  }

  async componentDidMount() {
    const {uiKit, match, auth}= this.props;
    const {id}= match.params;

    uiKit.loading.start();
    await getBoardPost(id).then(response=>{
      const {data}= response;
      console.log(data);
      this.setState({
        ...this.state,
        content: {
          id: data.id,
          title: data.title,
          content: data.body,
          nickname: data.username,
          createDate: data.createdAt,
        },
        imAuthor: auth? (auth.id === data.author.id): false,
      });
    }).catch(e=>{
      uiKit.toaster.cooking(errMsg(e));
    });
    uiKit.loading.end();

    this.setState({
      ...this.state,
      comments: [
        {id: randNum(1000), author: "댓글작성자", text: '테스트용댓글입니다아아', createdAt: '3일 전'},
        {id: randNum(1000), author: "댓글작성자", text: '테스트용댓글입니다아아', createdAt: '3일 전'},
        {id: randNum(1000), author: "댓글작성자", text: '테스트용댓글입니다아아', createdAt: '3일 전'},
        {id: randNum(1000), author: "댓글작성자", text: '테스트용댓글입니다아아', createdAt: '3일 전'},
        {id: randNum(1000), author: "댓글작성자", text: '테스트용댓글입니다아아', createdAt: '3일 전'},
        {id: randNum(1000), author: "댓글작성자", text: '테스트용댓글입니다아아', createdAt: '3일 전'},
        {id: randNum(1000), author: "댓글작성자", text: '테스트용댓글입니다아아', createdAt: '3일 전'},
      ]
    })
  };

  showUserInfo= async (nickname)=>{
    const {uiKit}= this.props;

    uiKit.loading.start();
    await delay(1000);
    uiKit.loading.end();

    uiKit.popup.make((
      <div>
        <h5>{nickname}의 정보</h5>
        <p>
          머시기머시기
        </p>
        <AlignLayout align={'right'}>
          <Button
            variant={'contained'}
            color={'primary'}>
            친구추가
          </Button>
          &nbsp;&nbsp;
          <Button
            variant={'contained'}
            color={'secondary'}>
            차단
          </Button>
        </AlignLayout>
      </div>
    ));
  };

  deletePost= ()=>{
    const {history, location, match, uiKit, auth}= this.props;
    const {content, comments, imAuthor}= this.state;
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
  }


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
                  this.showUserInfo(content.nickname);
                }}
                style={{
                  cursor: 'pointer'
                }}
                className={'explain'}>
                {content.nickname}
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
                <Fab  color={'secondary'} variant="extended">
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
              <InputGroup>
                <Input
                  ref={r=> this.input= r}
                  className={'transparent'}
                  type="text"
                  placeholder="댓글을 작성해보세요"
                  onKeyDown={e=>{
                    if(e.key=== 'Enter'){
                      //this.createComment();
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
              <br/>
              <p className={'explain'}>
                {comments.length}개의 댓글이 있습니다
              </p>
              {
                comments.map(comment=>
                  (
                    <Comment
                      profile={''}
                      name={comment.author}
                      text={comment.text}
                      createdAt={comment.createdAt}/>
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