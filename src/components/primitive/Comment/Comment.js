import React, {Component} from 'react';
import styles from './Comment.module.css';
import logo from '../../resource/icon.png';
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {authorized, delay} from "../../utils/utils";
import {quickConnect} from "../../redux";
import AlignLayout from "../../layouts/AlignLayout/AlignLayout";
import {Button} from "@material-ui/core";
import Optional from "../Optional/Optional";
import UserInfoViewer from "../../containers/UserInfoViewer/UserInfoViewer";
import {deletePostComment} from "../../http/tming";
import {errMsg} from "../../http/util";
import {Input, InputGroup, InputGroupAddon} from "reactstrap";

class Comment extends Component{
  state={
    openOptions: false,
    anchor: 0,
    updateMode: false,
    newText: this.props.text,
  };

  showUserInfo= (id)=>{
    const {uiKit}= this.props;
    uiKit.popup.make((
      <UserInfoViewer id={id}/>
    ));
  };


  render() {
    const {profile, author, text, createdAt, auth, postId, commentId, deleteComment, updateComment}= this.props;
    const {openOptions, anchor, updateMode, newText}= this.state;
    return (
      <div className={styles.wrapper}>
        <div
          onClick={()=>{
            if(author){
              this.showUserInfo(author.id);
            }
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
                        updateComment(postId, commentId, newText);
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
                        await updateComment(postId, commentId, newText);
                        this.setState({
                          ...this.state,
                          updateMode: false,
                          newText: '',
                        })
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
          <div className={styles.options}>
            <span className={'explain'}>
              {createdAt}
            </span>
            <div>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={(e)=>{
                  console.log(e.currentTarget);
                  this.setState({
                    ...this.state,
                    openOptions: true,
                    anchor: e.currentTarget
                  })
                }}
              >
                <MoreVertIcon style={{width: '16px', height: '16px'}}/>
              </IconButton>
              <Menu
                anchorEl={this.state.anchor}
                keepMounted
                open={this.state.openOptions}
                onClose={()=>{
                  this.setState({
                    ...this.state,
                    openOptions: false,
                  })
                }}
                PaperProps={{
                  style: {
                    width: 200,
                  },
                }}
              >
                <Optional
                  visible={authorized(auth) && auth.id=== author.id}>
                  <MenuItem
                    onClick={()=>{
                      this.setState({
                        ...this.state,
                        updateMode: true,
                      });
                    }}>
                    수정
                  </MenuItem>
                  <MenuItem
                    onClick={()=>{
                      deleteComment(postId, commentId);
                    }}>
                    삭제
                  </MenuItem>
                </Optional>
                <MenuItem
                  onClick={()=>{

                  }}>
                  신고
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default quickConnect(Comment);