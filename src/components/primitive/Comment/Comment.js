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

class Comment extends Component{
  state={
    openOptions: false,
    anchor: 0,
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
    const {profile, name, text, createdAt}= this.props;
    return (
      <div className={styles.wrapper}>
        <div
          onClick={()=>{
            if(name){
              this.showUserInfo(name);
            }
          }}
          className={styles.profile}>
          <img src={profile? profile: logo} alt=""/>
          <span style={{
            fontSize: '0.8rem'
          }}>
            {name? name: '익명'}
          </span>
        </div>
        <div className={styles.contents}>
          {text}
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
                <MenuItem
                  onClick={()=>{

                  }}>
                  수정
                </MenuItem>
                <MenuItem
                  onClick={()=>{

                  }}>
                  삭제
                </MenuItem>
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