import React, {Component} from 'react';
import styles from './Comment.module.css';
import logo from '../../resource/icon.png';
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {authorized} from "../../utils/utils";
import {quickConnect} from "../../redux";

class Comment extends Component{
  state={
    openOptions: false,
    anchor: 0,
  };

  render() {
    const {profile, name, text, createdAt}= this.props;
    return (
      <div className={styles.wrapper}>
        <div className={styles.profile}>
          <img src={profile? profile: logo} alt=""/>
          <b>{name? name: '익명'}</b>
        </div>
        <div className={styles.contents}>
          <p>
            {text}
          </p>
          <div className={styles.options}>
            <span>
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