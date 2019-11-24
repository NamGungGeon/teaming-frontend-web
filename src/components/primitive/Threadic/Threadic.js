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

class Threadic extends Component {
  state= {
    openComment: false,
  };

  handleCommentState= (unfold)=>{
    this.setState({
      ...this.state,
      openComment: unfold,
    })
  };

  componentWillUnmount() {
    const {uiKit}= this.props;
    uiKit.destroyAll();
  }

  render() {
    const {user, content, comments, uiKit}= this.props;
    const {openComment}= this.state;

    return (
      <div className={styles.wrapper}>
        <div
          onClick={()=>{this.handleCommentState(!openComment)}}>
          <h6>
            {user}
            &nbsp;&nbsp;
            <sub>2019.11.14 작성됨</sub>
          </h6>
          <p>
            {content}
            <br/>
          </p>
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
                  className={'transparent'}
                  type="text"
                  placeholder="댓글을 작성해보세요"
                  onChange={e=>{
                  this.setState({
                    ...this.state,
                    myComment: e.target.value,
                  });
                }}/>
                <InputGroupAddon addonType="append">
                  <Button
                    onClick={() => {
                    }}
                    size={'sm'}
                    color={'primary'}>
                    작성
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </div>
            {
              comments.map(comment=>
                (<div>
                  ㄴ&nbsp;{comment}
                  &nbsp;&nbsp;
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