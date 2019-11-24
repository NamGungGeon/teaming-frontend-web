import React, {Component} from 'react';
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import Input from "reactstrap/es/Input";
import styles from './Login.module.css';
import icon from '../../resource/logo_white.png';
import Button from "reactstrap/es/Button";
import {quickConnect} from "../../redux";
import AlignLayout from "../../layouts/AlignLayout/AlignLayout";
import {getPath} from "../../utils/url";
import {signin} from "../../http/tming";
import {errMsg} from "../../http/util";

class Login extends Component {
  state= {
    email: '',
    pw: '',
  };

  move= (url)=>{
    this.props.history.push(url);
  };

  login= async ()=>{
    const {email, pw}= this.state;
    const {uiKit, AuthDispatcher, history}= this.props;

    if(!email || !pw){
      uiKit.toaster.cooking('이메일과 비밀번호를 모두 입력하세요');
      return;
    }

    uiKit.loading.start();
    await signin(email, pw)
      .then((response)=>{
        const {id, access, refresh}= response.data;

        AuthDispatcher.login({
          email: id,
          token: access,
          refresh
        });
        history.push(getPath(`/mypage`));
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
          <AlignLayout align={'center'}>
            <img src={icon} alt="" className={styles.icon}/>
          </AlignLayout>

          <div className={styles.form}>
            <FormGroup>
              <Label for={"email"}>이메일</Label>
              <Input type={"email"} name={"email"} id={"email"}
                     className={'transparent'}
                     placeholder={"이메일을 입력하세요"}
                     onChange={(e)=>{
                       this.setState({
                         ...this.state,
                         email: e.target.value
                       });
                     }}/>
            </FormGroup>
            <FormGroup>
              <Label for={"pw"}>비밀번호</Label>
              <Input type={"password"} name={"pw"} id={"pw"}
                     className={'transparent'}
                     placeholder={"비밀번호를 입력하세요"}
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
            </FormGroup>
            <br/>
            <FormGroup className={styles.buttons}>
              <Button color={"primary"} onClick={()=>{this.login()}}>로그인</Button>
              <Button outline color={'primary'} onClick={()=>{
                this.props.history.push(getPath(`/auth/signup`));
              }}>회원가입</Button>
            </FormGroup>
            <Button
              color={'primary'}
              block
              onClick={e=>{
                uiKit.toaster.cooking('개발중인 기능입니다');
              }}>
              구글 계정으로 로그인
            </Button>
            <Button
              block
              onClick={e=>{
                this.props.history.push(getPath(`/auth/lost`));
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