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

class Read extends Component {
  state={
    id: '',
    content: null,
    comments: null,

    myComment: '',
    imAuthor: true,
  }

  async componentDidMount() {
    const {uiKit}= this.props;

    uiKit.loading.start();
    await delay(1000);
    uiKit.loading.end();

    this.setState({
      ...this.state,
      content: {id: randNum(1000), title: `title`, content: `content`, nickname: '제이쿼리권위자', createDate: '3일 전',},
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


  render() {
    const {content, comments, imAuthor}= this.state;

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
              <p>
                {content.content}
              </p>
              <br/>
              <AlignLayout align={'center'}>
                <Fab size='small' color={'primary'} variant="extended">
                  <IoIosThumbsUp style={{
                    fontSize: '20px'
                  }}/>
                  &nbsp;
                  정말 유용합니다!
                </Fab>
                &nbsp;&nbsp;&nbsp;
                <Fab size='small' color={'secondary'} variant="extended">
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
                        <IconButton>
                          <CreateIcon/>
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