import React, {Component} from 'react';
import styles from './Comment.module.css';
import logo from '../../resource/icon.png';
import IconButton from "@material-ui/core/IconButton";
import {authorized, beautifyDate, delay} from "../../utils/utils";
import {Button} from "@material-ui/core";
import Optional from "../Optional/Optional";
import {Input, InputGroup, InputGroupAddon} from "reactstrap";
import {IoIosPerson} from "react-icons/io";

import ReportIcon from '@material-ui/icons/Report';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from "@material-ui/core/Tooltip";

class Comment extends Component{
  state={
    newText: this.props.text,
  };

  static defaultProps= {
    profile: (<IoIosPerson style={{fontSize: '32px'}}/>),
    author: null,
    text: '',
    createdAt: beautifyDate(''),
    deleteComment: ()=>{

    },
    updateComment: (text)=>{

    },
    showUserInfo: (id)=>{

    }
  };


  render() {
    const {profile, author, text, createdAt, auth, deleteComment, updateComment, showUserInfo}= this.props;
    const {updateMode, newText}= this.state;


    return (
      <div className={styles.wrapper}>
        <div
          onClick={()=>{
            if(author)
              this.showUserInfo(author.id, author.username);
          }}
          className={styles.profile}>
          <span className={styles.picture}>
            {
              !profile || typeof profile === 'string'?
                (<img src={profile? profile: logo} alt=""/>)
                :
                profile
            }
          </span>
          <span>
            {author? author.username: '익명'}
          </span>
        </div>
        <div className={styles.contents}>
          {
            updateMode?
              (
                <InputGroup>
                  <Input
                    value={this.state.newText}
                    className={'transparent'}
                    type="text"
                    placeholder="댓글을 수정해보세요"
                    onKeyDown={e=>{
                      if(e.key=== 'Enter'){
                        updateComment(newText);
                        e.preventDefault();
                      }
                    }}
                    onChange={e=>{
                      this.setState({
                        ...this.state,
                        newText: e.target.value,
                      });
                    }}/>
                  <InputGroupAddon addonType="append">
                    <Button
                      onClick={async ()=>{
                        await updateComment(newText);
                        this.setState({
                          ...this.state,
                          updateMode: false,
                        });
                      }}
                      variant="contained"
                      color="primary">
                      수정
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              ):
              (<div>{text}</div>)
          }
          <div
            className={styles.options}>
            <span className={'explain'}>
              {createdAt}
            </span>
            <div>
              <Optional
                visible={!auth || auth.id=== author.id}>
                <Tooltip title={'수정'}>
                  <IconButton
                    size={'small'}
                    onClick={()=>{
                      this.setState({
                        ...this.state,
                        updateMode: !updateMode,
                      });
                    }}>
                    <CreateIcon fontSize={'small'}/>
                  </IconButton>
                </Tooltip>
                <Tooltip title={'삭제'}>
                  <IconButton
                    size={'small'}
                    onClick={()=>{
                      deleteComment();
                    }}>
                    <DeleteIcon fontSize={'small'}/>
                  </IconButton>
                </Tooltip>
              </Optional>
              <Tooltip title={'신고'}>
                <IconButton
                  size={'small'}>
                  <ReportIcon fontSize={'small'}/>
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;