import React, {Component} from 'react';
import Section from "../../primitive/Section/Section";
import PageTitle from "../../primitive/PageTitle/PageTitle";
import {Alert, Col, FormGroup, InputGroupAddon, Label} from "reactstrap";
import InputGroup from "reactstrap/es/InputGroup";
import Input from "reactstrap/es/Input";
import Button from "reactstrap/es/Button";
import {Validator} from "class-validator";

class Lost extends Component {
  state={
    email: '',
    success: false,
    msg: '',
  };

  validator= new Validator();

  render() {
    const {msg, success, email}= this.state;
    return (
      <div>
        <PageTitle title={'PW찾기'} explain={'이메일 찾기는 지원되지 않습니다'} align={'center'}/>
        <Section>
          {
            msg && (
              <div>
                <Alert color={success? 'success': 'danger'}>{msg}</Alert>
              </div>
            )
          }
          <div>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>이메일</Label>
              <Col sm={10}>
                <InputGroup>
                  <Input
                    className={'transparent'}
                    type="email" placeholder="가입당시에 입력했던 이메일을 입력하세요"
                     onChange={e=>{
                       this.setState({
                         ...this.state,
                         email: e.target.value,
                       })
                     }}/>
                  <InputGroupAddon addonType="append">
                    <Button
                      onClick={() => {
                        if(this.validator.isEmail(email))
                          this.setState({
                            ...this.state,
                            success: true,
                            msg: '가입하신 이메일로 비밀번호 초기화 메일이 발송되었습니다',
                          })
                        else
                          this.setState({
                            ...this.state,
                            success: false,
                            msg: '올바른 이메일 형식이 아닙니다',
                          });
                      }}
                      color={'primary'}>
                      찾기
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </Col>
            </FormGroup>
          </div>
        </Section>
      </div>
    );
  }
}

export default Lost;