import React, { Component } from 'react';
import styles from './HelpAppInstall.module.css';
import { Button } from '@material-ui/core';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';
import AndroidIcon from '@material-ui/icons/Android';
import AppleIcon from '@material-ui/icons/Apple';
import CloseIcon from '@material-ui/icons/Close';
import { quickConnect } from '../../../redux/quick';

class HelpAppInstall extends Component {
  state = {
    closed: false
  };
  render() {
    const { closed } = this.state;
    const { config } = this.props;
    if (closed || config.imapp) return <div></div>;

    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <b>티밍을 앱에서 편리하게 사용해보세요</b>
          <CloseIcon
            onClick={() => {
              this.setState({
                ...this.state,
                closed: true
              });
            }}
          />
        </div>
        <br />
        <AlignLayout align={'right'}>
          <Button
            color={'primary'}
            variant={'outlined'}
            onClick={() => {
              window.open('https://tming.kr');
            }}
          >
            <AndroidIcon />
            &nbsp; 안드로이드 앱
          </Button>
          &nbsp;&nbsp;
          <Button
            color={'secondary'}
            variant={'outlined'}
            onClick={() => {
              window.open('https://tming.kr');
            }}
          >
            <AppleIcon />
            &nbsp; 아이폰 앱
          </Button>
        </AlignLayout>
      </div>
    );
  }
}

export default quickConnect(HelpAppInstall);
