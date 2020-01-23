import React, {Component} from 'react';
import PageTitle from "../../primitive/PageTitle/PageTitle";
import Input from "reactstrap/es/Input";
import {Button, Col, FormGroup, InputGroupAddon, Label} from "reactstrap";
import Form from "reactstrap/es/Form";
import AlignLayout from "../../layouts/AlignLayout/AlignLayout";
import {Validator} from "class-validator";
import {quickConnect} from "../../../redux/quick";
import ButtonGroup from "reactstrap/es/ButtonGroup";
import {signup} from "../../../http/tming";
import {errMsg, responseCode} from "../../../http/util";
import {getPath} from "../../../utils/url";
import {privacy} from "../../../utils/strings";
import {authorized} from "../../../utils/utils";
import {Button as MdButton} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

class SignUp extends Component {
  state= {
    email: '',
    gender: 'M',
    nickname: '',
    pw: '',
    pwCheck: '',
  };
  validator= new Validator();

  componentDidMount() {
    const {auth, history}= this.props;
    if(authorized(auth)){
      history.push(getPath(`/`));
      return;
    }

    this.openPrivacyRule();
  }

  componentWillUnmount() {
    this.props.uiKit.destroyAll();
  }
  openPrivacyRule= ()=>{
    const {uiKit, history}= this.props;

    uiKit.popup.make((
      <div>
        <h3>티밍 개인정보 처리방침</h3>
        <div
          style={{
            overflowY: 'scroll',
            height: '400px'
          }}>
          {privacy}
        </div>
        <br/>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <MdButton
            style={{
              flex: '1',
            }}
            variant={'contained'}
            color={'primary'}
            fullWidth
            onClick={()=>{
              uiKit.popup.destroy();
            }}>
            동의함
          </MdButton>
          &nbsp;
          <MdButton
            style={{
              flex: '1',
            }}
            variant={'contained'}
            color={'default'}
            fullWidth
            onClick={()=>{
              uiKit.toaster.cooking('약관에 동의하지 않으면 사용할 수 없습니다');
              uiKit.popup.destroy();
              history.push(getPath('/'));
            }}>
            <span style={{
              color: '#333333'
            }}>
              동의하지 않음
            </span>
          </MdButton>
        </div>
      </div>
    ), true);
  };

  submit= async ()=>{
    const {uiKit, history}= this.props;
    const {email, gender, nickname, pw, pwCheck}= this.state;
    if(!email || !this.validator.isEmail(email)){
      uiKit.toaster.cooking('이메일 형식을 다시 확인하세요');
      return;
    }
    if(!pw){
      uiKit.toaster.cooking('비밀번호를 입력하세요');
      return;
    }
    if(pw!== pwCheck){
      uiKit.toaster.cooking('비밀번호와 비밀번호 확인이 일치하지 않습니다');
      return;
    }
    if(!nickname || nickname.length> 32){
      uiKit.toaster.cooking('닉네임은 32자 이하로 작성해주세요');
      return;
    }

    uiKit.loading.start();
    await signup(email, pw, nickname, gender)
      .then(response=>{
        uiKit.popup.make((
          <div>
            <h4>회원가입이 완료되었습니다</h4>
            <br/>
            <Button
              color={'primary'}
              onClick={()=>{
                history.push(getPath(`/auth/signin`));
              }}>
              로그인 페이지로 이동
            </Button>
          </div>
        ))
      })
      .catch(e=>{
        uiKit.toaster.cooking(errMsg(e));
      });
    uiKit.loading.end();
  };

  render() {
    const {uiKit}= this.props;
    const {emailCheck, email, gender, nickname, nicknameCheck}= this.state;

    return (
      <div>
        <div
          style={{
            padding: '8px'
          }}>
          <PageTitle
            title={'회원 가입'}
            explain={'얼마 걸리지 않습니다'}
            align={'left'}/>
            <br/>
          <Form>
          <TextField
            fullWidth
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
              variant={'outlined'}
              label="패스워드"
              type={'password'}
              onChange={(e)=>{
                this.setState({
                  ...this.state,
                  pw: e.target.value
                });
              }}/>
            <br/><br/>
            <TextField
              fullWidth
              variant={'outlined'}
              label="패스워드 확인"
              type={'password'}
              onChange={(e)=>{
                this.setState({
                  ...this.state,
                  pwCheck: e.target.value
                });
              }}/>
            <br/><br/>
            <div style={{
              padding: '18.5px 14px',
              borderRadius: '4px',
              border: '1px solid #33333355',
              display: 'inline-block',
              width: '100%',
            }}>
              <FormControl
                component="fieldset">
                <FormLabel component="legend">성별</FormLabel>
                <RadioGroup row aria-label="gender" name="gender1" value={gender}>
                  <FormControlLabel
                    value="M"
                    control={<Radio color={'primary'}/>}
                    label="남자"
                    onClick={()=>{
                      this.setState({...this.state, gender: 'M'});
                    }}/>
                  <FormControlLabel
                    value="F"
                    control={<Radio color={'secondary'}/>}
                    label="여자"
                    onClick={()=>{
                      this.setState({...this.state, gender: 'F'});
                    }}/>
                </RadioGroup>
              </FormControl>
            </div>
            <br/><br/>
            <TextField
              fullWidth
              variant={'outlined'}
              label='닉네임'
              type={'text'}
              onChange={(e)=>{
                this.setState({
                  ...this.state,
                  nickname: e.target.value
                });
              }}/>
          </Form>
          <br/> <br/>
          <AlignLayout align={'left'}>
            <MdButton
              variant={'contained'}
              color={'primary'}
              onClick={this.submit}
              size={'large'}>
              가입 완료!
            </MdButton>
          </AlignLayout>
        </div>
      </div>
    );
  }
}

export default quickConnect(SignUp);