import React, {Component} from 'react';
import styles from './Threadic.module.css';
import Collapse from "reactstrap/es/Collapse";
import AlignLayout from "../../layouts/AlignLayout/AlignLayout";
import { MdComment, MdBuild } from "react-icons/md";
import {Col, FormGroup, InputGroupAddon, Label} from "reactstrap";
import Input from "reactstrap/es/Input";
import InputGroup from "reactstrap/es/InputGroup";
import {quickConnect} from "../../../redux/quick";
import {createTrashComment, deleteTrashComment, getTrashComments, updateTrashComment} from "../../../http/tming";
import {errMsg} from "../../../http/util";
import moment from "moment";
import Comment from "../Comment/Comment";
import Section from "../Section/Section";
import Button from "@material-ui/core/Button";
import {IoIosPerson} from 'react-icons/io'
import Popup from "../Popup/Popup";
import {randStr} from "../../../utils/utils";
import PageTitle from "../PageTitle/PageTitle";

class Threadic extends Component {
  state= {
    password: '',
    myComment: '',
    comments: null,
    openComment: false,
  };

  handleCommentState= (unfold)=>{
    if(unfold)
      this.loadComments();

    this.setState({
      ...this.state,
      openComment: unfold,
    });
  };

  componentWillUnmount() {
    const {uiKit}= this.props;
    uiKit.destroyAll();
  }

  loadComments= async()=>{
    const {uiKit, id}= this.props;

    uiKit.loading.start();
    await getTrashComments(id).then(response=>{
      const {data}= response.data;
      console.log(data);
      this.setState({
        ...this.state,
        comments: data,
      });
    }).catch(e=>{
      uiKit.toaster.cooking(errMsg(e));
    });
    uiKit.loading.end();
  };

  createComment= ()=>{
    const {uiKit, id}= this.props;

    uiKit.popup.make((
      <div>
        <h5>댓글 수정/삭제에 사용할 비밀번호를 입력하세요</h5>
        <br/>
        <Input
          className={'transparent'}
          type={'password'}
          onChange={e=>{
            this.setState({
              ...this.state,
              password: e.target.value,
            })
          }}
          placeholder={'수정/삭제에 사용할 비밀번호를 입력하세요'}/>
        <br/>
        <br/>
        <AlignLayout align={'right'}>
          <Button
            onClick={async ()=>{
              const {myComment, password}= this.state;

              if(!password){
                uiKit.toaster.cooking('비밀번호를 입력하세요');
                return;
              }

              uiKit.loading.start();
              await createTrashComment(password, id, myComment).then(response=>{
                //ok. reload!
                this.loadComments();
                uiKit.popup.destroy();
              }).catch(e=>{
                uiKit.toaster.cooking(errMsg(e));
              });
              uiKit.loading.end();
            }}
            variant={'contained'}
            color={'primary'}>
            작성
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
    ));
  };

  removeComment= (replyId)=>{
    //check auth
    const {id, uiKit}= this.props;

    //open deleting comment popup
    uiKit.popup.make((
      <div>
        <h5>정말 이 댓글을 삭제하시겠습니까?</h5>
        <br/>
        <Input
          className={'transparent'}
          type={'password'}
          onChange={e=>{
            console.log('changed', e.target.value);
            console.log('changed', this.state);
            this.setState({
              ...this.state,
              password: e.target.value,
            });
          }}
          placeholder={'작성 시 입력한 비밀번호를 입력하세요'}/>
        <br/>
        <Button
          onClick={async ()=>{
            const {password}= this.state;

            uiKit.loading.start();
            await deleteTrashComment(password, id, replyId).then(r=>{
              //ok, reload!
              uiKit.popup.destroy();
              this.loadComments();
            }).catch(e=>{
              uiKit.toaster.cooking(errMsg(e));
            });
            uiKit.loading.end();
          }}
          variant={'contained'}
          color={'primary'}>
          예, 삭제합니다
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
      </div>
    ));
  };

  updateComment= (replyId, text)=>{
    //check auth
    const {id, uiKit}= this.props;

    //open deleting comment popup
    uiKit.popup.make((
      <div>
        <h5>댓글 수정</h5>
        <br/>
        <Input
          className={'transparent'}
          type={'password'}
          onChange={e=>{
            console.log('changed', e.target.value);
            console.log('changed', this.state);
            this.setState({
              ...this.state,
              password: e.target.value,
            });
          }}
          placeholder={'작성 시 입력한 비밀번호를 입력하세요'}/>
        <br/>
        <Button
          onClick={async ()=>{
            const {password}= this.state;

            uiKit.loading.start();
            await updateTrashComment(password, id, replyId, text).then(r=>{
              //ok, reload!
              uiKit.popup.destroy();
              this.loadComments();
            }).catch(e=>{
              uiKit.toaster.cooking(errMsg(e));
            });
            uiKit.loading.end();
          }}
          variant={'contained'}
          color={'primary'}>
          수정
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
      </div>
    ));
  };

  render() {
    const {user, content, createdAt, uiKit, replies}= this.props;
    const {openComment, comments}= this.state;

    return (
      <Section
        divideStyle={'fill'}
        className={styles.wrapper}>
        <div
          onClick={()=>{this.handleCommentState(!openComment)}}>
          <h5>
            {user}
            <br/>
            <sub>
              {moment(createdAt, "YYYY-MM-DDThh:mm:ss.SSS").fromNow()}
            </sub>
          </h5>
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
            &nbsp;{comments? comments.length: replies}
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
        {
          comments && (
            <div className={styles.comments}>
              <Collapse isOpen={openComment}>
                <br/>
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
                        size={'small'}
                        variant={'contained'}
                        color={'primary'}>
                        작성
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
                <br/>
                {
                  comments.map(comment=>
                    (
                      <Comment
                        deleteComment={()=>{
                          this.removeComment(comment.id);
                        }}
                        updateComment={(text)=>{
                          this.updateComment(comment.id, text);
                        }}
                        profile={<IoIosPerson style={{fontSize: '32px'}}/>}
                        text={comment.text}
                        createdAt={'3일 전'}/>
                    )
                  )
                }
              </Collapse>
            </div>
          )
        }
        </Section>
    );
  }
}

Threadic.defaultProps={
  comments: [],
  user: '익명',
  content: '',
};

export default quickConnect(Threadic);