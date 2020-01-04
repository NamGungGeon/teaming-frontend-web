import React, {Component} from 'react';
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import Input from "reactstrap/es/Input";
import styles from './Login.module.css';
import icon from '../../resource/logo_white.png';
import {quickConnect} from "../../redux";
import AlignLayout from "../../layouts/AlignLayout/AlignLayout";
import {getPath} from "../../utils/url";
import {signin} from "../../http/tming";
import {errMsg} from "../../http/util";
import Button from "@material-ui/core/Button";
import getHistory from 'react-router-global-history';
import PageTitle from "../../primitive/PageTitle/PageTitle";
import TextField from "@material-ui/core/TextField";
import Form from "reactstrap/es/Form";

class Login extends Component {
  state= {
    email: '',
    pw: '',
  };


  login= async ()=>{
    const {email, pw}= this.state;
    const {uiKit, AuthDispatcher}= this.props;

    if(!email || !pw){
      uiKit.toaster.cooking('이메일과 비밀번호를 모두 입력하세요');
      return;
    }

    uiKit.loading.start();
    await signin(email, pw)
      .then((response)=>{
        console.log(response.data);
        const {id, access, refresh}= response.data;

        AuthDispatcher.login({
          token: access,
          refresh,
          id: id,
        });
        uiKit.popup.destroy();
        getHistory().push(getPath('/'));
      })
      .catch((e)=> {
        uiKit.toaster.cooking(errMsg(e));
      });
    uiKit.loading.end();
  };

  render() {
    const {uiKit}= this.props;

    return (
      <div className={styles.parent}>
        <div className={styles.child}>
          <h3>로그인</h3>
          <br/>
          <div className={styles.form}>
            <Form>
              <TextField
                fullWidth
                size={'small'}
                variant={'outlined'}
                label="이메일"
                type={'email'}
                onChange={(e)=>{
                  this.setState({
                    ...this.state,
                    email: e.target.value
                  });
                }}/>
              <br/><br/>
              <TextField
                fullWidth
                size={'small'}
                variant={'outlined'}
                label="패스워드"
                type={'password'}
                onChange={(e)=>{
                  this.setState({
                    ...this.state,
                    pw: e.target.value
                  });
                }}
                onKeyDown={(e)=>{
                  if(e.key=== 'Enter')
                    this.login();
                }}/>
            </Form>
            <br/><br/>
            <FormGroup className={styles.buttons}>
              <Button
                variant={'contained'}
                color={"primary"}
                onClick={()=>{this.login()}}>
                로그인
              </Button>
              <Button
                variant={'outlined'}
                color={'primary'}
                onClick={()=>{
                  getHistory().push(getPath(`/auth/signup`));
              }}>
                회원가입
              </Button>
            </FormGroup>
            <Button
              style={{
                marginBottom: '8px'
              }}
              fullWidth
              variant={'contained'}
              color={"primary"}
              onClick={e=>{
                uiKit.toaster.cooking('개발중인 기능입니다');
              }}>
              구글 계정으로 로그인
            </Button>
            <Button
              fullWidth
              variant={'contained'}
              color={"secondary"}
              onClick={e=>{
                getHistory().push(getPath(`/auth/lost`));
              }}>
              ID/PW찾기
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default quickConnect(Login);