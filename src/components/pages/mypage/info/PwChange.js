import React, {Component} from 'react';
import PageTitle from "../../../primitive/PageTitle/PageTitle";
import Input from "reactstrap/es/Input";
import InputGroupAddon from "reactstrap/es/InputGroupAddon";
import InputGroup from "reactstrap/es/InputGroup";
import Button from "reactstrap/es/Button";
import Collapse from "reactstrap/es/Collapse";
import {quickConnect} from "../../../redux";
import {delay} from "../../../utils/utils";
import Alert from "reactstrap/es/Alert";
import AlignLayout from "../../../layouts/AlignLayout/AlignLayout";
import {getPath} from "../../../utils/url";

class PwChange extends Component {
  state={
    checked: false,
  };

  checking= async ()=>{
    const {uiKit}= this.props;
    uiKit.loading.start();
    await delay(100);
    uiKit.loading.end();

    this.setState({
      checked: true,
    });
  };

  submit= async ()=>{
    const {uiKit, history, AuthDispatcher}= this.props;
    uiKit.loading.start();
    await delay(100);
    uiKit.loading.end();

    uiKit.popup.make((
      <AlignLayout align={'center'}>
        <PageTitle title={'변경이 완료되었습니다'} explain={'재 로그인이 필요합니다'} noMargin/>
        <br/>
        <Button
          block
          color={'success'}
          onClick={()=>{
            AuthDispatcher.logout();
            history.push(getPath(`/auth/signin`));
          }}>
          로그인 페이지로 이동
        </Button>
      </AlignLayout>
    ), true)
  };

  componentWillUnmount() {
    this.props.uiKit.popup.destroy();
  }

  render() {
    const {checked}= this.state;

    return (
      <div>
        <Collapse isOpen={!checked}>
          <PageTitle title={'비밀번호 변경'} explain={'현재 사용중인 비밀번호를 다시 확인합니다'} noMargin/>
          <br/>
          <InputGroup
            style={{
              width: '100%',
              maxWidth: '500px'
            }}>
            <Input type={'password'} className={'transparent'} placeholder={'현재 사용중인 비밀번호'}/>
            <InputGroupAddon addonType={'append'}>
              <Button
                color={'primary'}
                onClick={this.checking}>
                확인
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Collapse>
        <Collapse isOpen={checked}>
          <Alert color={'success'}>
            <PageTitle title={'새로운 비밀번호 설정'} explain={'새로 사용할 비밀번호를 입력하세요'} noMargin titleColor={'#28a745'}/>
            <br/>

            <Input type={'password'} placeholder={'새로운 비밀번호'}/>
            <br/>
            <Input type={'password'} placeholder={'새로운 비밀번호 확인'}/>
            <br/><br/>

            <Button
              onClick={this.submit}
              color={'success'}
              block>
              변경
            </Button>
          </Alert>
        </Collapse>
      </div>
    );
  }
}

export default quickConnect(PwChange);