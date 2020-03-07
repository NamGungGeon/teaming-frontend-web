import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import styles from './Login.module.css';
import { quickConnect } from '../../../redux/quick';
import { getPath } from '../../../utils/url';
import { signin, socialSignIn, socialSignUp } from '../../../http/tming';
import { errMsg } from '../../../http/util';
import Button from '@material-ui/core/Button';
import getHistory from 'react-router-global-history';
import TextField from '@material-ui/core/TextField';

class Login extends Component {
  state = {
    email: '',
    pw: ''
  };

  login = async () => {
    const { email, pw } = this.state;
    const { uiKit, AuthDispatcher } = this.props;

    if (!email || !pw) {
      uiKit.toaster.cooking('이메일과 비밀번호를 모두 입력하세요');
      return;
    }

    uiKit.loading.start();
    await signin(email, pw)
      .then(response => {
        const { id, access, refresh } = response.data;
        AuthDispatcher.login({
          token: access,
          refresh,
          id: id
        });
        uiKit.popup.destroy();
        uiKit.toaster.cooking('로그인 되었습니다');
      })
      .catch(e => {
        uiKit.toaster.cooking(errMsg(e));
      });
    uiKit.loading.end();
  };

  handleGoogleLogin = async event => {
    const { AuthDispatcher, uiKit } = this.props;
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();

    const { user } = await firebase.auth().signInWithPopup(provider);
    const { uid } = user;

    try {
      uiKit.loading.start();
      const response = await socialSignIn('GOOGLE', uid);
      const { id, access, refresh } = response.data;
      AuthDispatcher.login({ id, token: access, refresh });
      uiKit.popup.destroy();
      uiKit.toaster.cooking('로그인 되었습니다');
      uiKit.loading.end();
    } catch (error) {
      try {
        const { email } = user;
        const response = await socialSignUp('GOOGLE', uid, email);
        const { id, access, refresh } = response.data;
        AuthDispatcher.login({ id, token: access, refresh });
        uiKit.popup.destroy();
        uiKit.toaster.cooking('로그인 되었습니다');
        uiKit.loading.end();
      } catch (error) {
        uiKit.toaster.cooking(errMsg(error));
      }
    }
  };

  render() {
    return (
      <div className={styles.parent}>
        <div className={styles.child}>
          <h3>로그인</h3>
          <br />
          <div className={styles.form}>
            <div>
              <TextField
                fullWidth
                size={'small'}
                variant={'outlined'}
                label="이메일"
                type={'email'}
                onChange={e => {
                  this.setState({
                    ...this.state,
                    email: e.target.value
                  });
                }}
              />
              <br />
              <br />
              <TextField
                fullWidth
                size={'small'}
                variant={'outlined'}
                label="패스워드"
                type={'password'}
                onChange={e => {
                  this.setState({
                    ...this.state,
                    pw: e.target.value
                  });
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter') this.login();
                }}
              />
            </div>
            <br />
            <br />
            <div className={styles.buttons}>
              <Button
                variant={'contained'}
                color={'primary'}
                onClick={() => {
                  this.login();
                }}
              >
                로그인
              </Button>
              <Button
                variant={'outlined'}
                color={'primary'}
                onClick={() => {
                  getHistory().push(getPath(`/auth/signup`));
                }}
              >
                회원가입
              </Button>
            </div>
            <Button
              style={{
                marginBottom: '8px'
              }}
              fullWidth
              variant={'contained'}
              color={'primary'}
              onClick={this.handleGoogleLogin}
            >
              구글 계정으로 로그인
            </Button>
            <Button
              fullWidth
              variant={'contained'}
              color={'secondary'}
              onClick={e => {
                getHistory().push(getPath(`/auth/lost`));
              }}
            >
              ID/PW찾기
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default quickConnect(Login);
