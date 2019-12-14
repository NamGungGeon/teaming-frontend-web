import React, {Component} from 'react';
import styles from './Threadic.module.css';
import Collapse from "reactstrap/es/Collapse";
import AlignLayout from "../../layouts/AlignLayout/AlignLayout";
import { MdComment, MdBuild } from "react-icons/md";
import {Col, FormGroup, InputGroupAddon, Label} from "reactstrap";
import Input from "reactstrap/es/Input";
import Form from "reactstrap/es/Form";
import Button from "reactstrap/es/Button";
import InputGroup from "reactstrap/es/InputGroup";
import {quickConnect} from "../../redux";
import {createTrashComment, deleteTrashComment, getTrashComments} from "../../http/tming";
import {errMsg} from "../../http/util";
import moment from "moment";

class Threadic extends Component {
  state= {
    openComment: false,
    myComment: '',
    comments: [],
  };
  handleCommentState= (unfold)=>{
    if(unfold)
      this.loadComments();

    this.setState({
      ...this.state,
      openComment: unfold,
    })
  };
  componentDidMount() {
    const {comments}= this.props;
    this.setState({
      ...this.state,
      comments,
    })
  }

  componentWillUnmount() {
    const {uiKit}= this.props;
    uiKit.destroyAll();
  }
  loadComments= async()=>{
    const {uiKit, auth, id}= this.props;

    await getTrashComments(auth, id).then(response=>{
      const {data}= response.data;
      console.log(data);
      this.setState({
        ...this.state,
        comments: data,
      });
    }).catch(e=>{
      uiKit.toaster.cooking(errMsg(e));
    });
  }
  createComment= async ()=>{
    const {uiKit, auth, id}= this.props;
    const {myComment}= this.state;

    //console.log(id);

    uiKit.loading.start();
    await createTrashComment(auth, id, myComment).then(response=>{
      //ok. reload!
      //console.log('before: ',this.input);
      this.input.value= '';
      //console.log('after: ',this.input);
      this.loadComments();
    }).catch(e=>{
      uiKit.toaster.cooking(errMsg(e));
    });
    uiKit.loading.end();
  };

  removeComment= (replyId)=>{
    //check auth
    const {id:feelId, auth, uiKit}= this.props;
    let notAuth= false;
    this.state.comments.map(comment=>{
      if(comment.id === replyId){
        //Are you author?
        if(auth.id !== comment.id){
          //you are not author
          //fuck off
          notAuth= true;
          uiKit.toaster.cooking('댓글 작성자만 삭제할 수 있습니다');
        }
      }
    });

    if(!notAuth){
      //open deletingc comment popup
      uiKit.popup.make((
        <div>
          <h3>정말 이 댓글을 삭제하시겠습니까?</h3>
          <br/>
          <Button
            onClick={async ()=>{
              uiKit.loading.start();
              await deleteTrashComment(auth, feelId, replyId).then(r=>{
                //ok, reload!
                this.loadComments();
              }).catch(e=>{
                uiKit.toaster.cooking(errMsg(e));
              });
              uiKit.loading.end();
            }}
            block
            color={'danger'}>
            예, 삭제합니다
          </Button>
        </div>
      ));
    }
  }

  render() {
    const {user, content, createdAt, uiKit}= this.props;
    const {openComment, comments}= this.state;

    return (
      <div className={styles.wrapper}>
        <div
          onClick={()=>{this.handleCommentState(!openComment)}}>
          <h6>
            {user}
            <br/>
            <sub>
              {moment(createdAt, "YYYY-MM-DDThh:mm:ss.SSS").fromNow()}
            </sub>
          </h6>
          <br/>
          <div>
            {content}
          </div>
        </div>
        <AlignLayout align={'right'}>
          <span
            onClick={()=>{
              this.handleCommentState(true)}
            }>
            <MdComment/>
            &nbsp;{comments.length}
          </span>
          &nbsp;&nbsp;
          <span
            onClick={()=>{
              //report
              uiKit.popup.make(
                (<div>
                  신고 ㄱ?
                </div>)
              );
            }}>
            <MdBuild/>
            &nbsp;신고
          </span>
        </AlignLayout>
        <div className={styles.comments}>
          <Collapse isOpen={openComment}>
            <div className={styles.create}>
              <InputGroup>
                <Input
                  ref={r=> this.input= r}
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
                    size={'sm'}
                    color={'primary'}>
                    작성
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </div>
            {
              comments.map(comment=>
                (<div
                  onClick={()=>{
                    this.removeComment(comment.id);
                  }}>
                  ㄴ&nbsp;{comment.text}
                  <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <sub>2019.11.14 작성됨</sub>
                </div>)
              )
            }
          </Collapse>
        </div>
        </div>
    );
  }
}

Threadic.defaultProps={
  comments: [],
  user: '익명',
  content: '',
};

export default quickConnect(Threadic);