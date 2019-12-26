import React, {Component} from 'react';
import PageTitle from "../../primitive/PageTitle/PageTitle";
import Section from "../../primitive/Section/Section";
import Input from "reactstrap/es/Input";
import {Col, FormGroup, InputGroupAddon, Label} from "reactstrap";
import Button from "reactstrap/es/Button";
import InputGroup from "reactstrap/es/InputGroup";
import Form from "reactstrap/es/Form";
import AlignLayout from "../../layouts/AlignLayout/AlignLayout";
import {Validator} from "class-validator";
import {quickConnect} from "../../redux";
import ButtonGroup from "reactstrap/es/ButtonGroup";
import {signup} from "../../http/tming";
import {errMsg, responseCode} from "../../http/util";
import {getPath} from "../../utils/url";
import {privacy} from "../../utils/strings";
import {authorized} from "../../utils/utils";

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
    const {uiKit}= this.props;
    uiKit.popup.make((
      <div>
        <h3>티밍 개인정보 처리방침</h3>
        <div
          style={{
            overflowY: 'scroll',
            height: '300px'
          }}>
          {privacy}
        </div>
        <Button
          color={'primary'}
          block
          onClick={()=>{
            uiKit.popup.destroy();
          }}>
          동의
        </Button>
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
        <PageTitle title={'회원 가입'} explain={'얼마 걸리지 않습니다'} align={'center'}/>
        <Section>
          <Form>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>이메일</Label>
              <Col sm={10}>
                <Input type="email" placeholder="E-mail"
                       className={'transparent'}
                       onChange={e=>{
                         this.setState({
                           ...this.state,
                           email: e.target.value,
                         });
                       }}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>비밀번호</Label>
              <Col sm={10}>
                <Input type="password" placeholder="비밀번호 (5~12자)"
                       className={'transparent'}
                       onChange={e=>{
                        this.setState({
                          ...this.state,
                          pw: e.target.value,
                      });
                }}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>비밀번호 확인</Label>
              <Col sm={10}>
                <Input
                  className={'transparent'}
                  type="password"
                  placeholder="비밀번호를 동일하게 입력하세요"
                  onChange={e=>{
                  this.setState({
                    ...this.state,
                    pwCheck: e.target.value,
                  });
                }}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>성별</Label>
              <Col sm={10}>
                <ButtonGroup>
                  <Button color={'primary'} outline={gender!=='M'} onClick={()=>{this.setState({...this.state, gender: 'M'})}}>남자</Button>
                  <Button color={'danger'} outline={gender!=='F'} onClick={()=>{this.setState({...this.state, gender: 'F'})}}>여자</Button>
                </ButtonGroup>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>닉네임</Label>
              <Col sm={10}>
                <Input
                  className={'transparent'}
                  type="text"
                  placeholder="티밍에서 사용할 닉네임을 입력하세요"
                  onChange={e=>{
                    this.setState({
                      ...this.state,
                      nickname: e.target.value,
                    });
                  }}/>
              </Col>
            </FormGroup>
          </Form>
          <br/>
          <AlignLayout align={'right'}>
            <Button color={'primary'} onClick={this.submit} size={'large'}>회원가입</Button>
          </AlignLayout>
        </Section>
      </div>
    );
  }
}

export default quickConnect(SignUp);