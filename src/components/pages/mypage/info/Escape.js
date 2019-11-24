import React, {Component} from 'react';
import Button from "reactstrap/es/Button";
import AlignLayout from "../../../layouts/AlignLayout/AlignLayout";
import Alert from "reactstrap/es/Alert";
import Collapse from "reactstrap/es/Collapse";
import PageTitle from "../../../primitive/PageTitle/PageTitle";
import InputGroup from "reactstrap/es/InputGroup";
import Input from "reactstrap/es/Input";
import {InputGroupAddon} from "reactstrap";
import {quickConnect} from "../../../redux";
import {getPath} from "../../../utils/url";

class Escape extends Component {
  state={
    ok: false,
    pw: '',
  }
  render() {
    const {ok}= this.state;
    const {uiKit, AuthDispatcher, history}= this.props;

    return (
      <div>
        <Collapse isOpen={!ok}>
          <Alert color={'danger'}>
            이 작업은 취소할 수 없습니다<br/>
            회원탈퇴가 완료되는 즉시 사용자의 모든 개인정보는 파기됩니다.<br/>
            <br/>
            <Button
              color={'danger'}
              block
              onClick={()=>{
                this.setState({
                  ...this.state,
                  ok: true,
                })
              }}>
              알겠습니다. 계속 진행해 주십시오.
            </Button>
          </Alert>
        </Collapse>
        <Collapse isOpen={ok}>
          <Alert color={'danger'}>
            <PageTitle title={'계정의 패스워드를 입력해 주십시요'} explain={'본인 확인이 완료되면 탈퇴가 승인됩니다'} noMargin titleColor={'#721c24'}/>
            <br/>
            <InputGroup>
              <Input
                type="password"
                placeholder="로그인에 사용한 비밀번호를 입력하세요"
                onChange={e=>{
                  this.setState({
                    ...this.state,
                    pw: e.target.value,
                });
              }}/>
              <InputGroupAddon addonType="append">
                <Button
                  onClick={() => {
                    //pw check
                    const {pw}= this.state;
                    if(pw!== 'test'){
                      uiKit.toaster.cooking('비밀번호가 일치하지 않습니다');
                    }else{
                      uiKit.popup.make((
                        <div>
                          <h3>티밍을 이용해주셔서 감사합니다</h3>
                          <p>
                            회원탈퇴가 완료되었습니다
                          </p>
                          <br/>
                          <Button block color={'primary'}
                                  onClick={()=>{
                                    uiKit.destroyAll();
                                    AuthDispatcher.logout();
                                  }}>
                            홈으로 돌아가기
                          </Button>
                        </div>
                      ), true);
                    }
                  }}
                  size={'sm'}
                  color={'danger'}>
                  탈퇴
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Alert>
        </Collapse>
      </div>
    );
  }
}

export default quickConnect(Escape);