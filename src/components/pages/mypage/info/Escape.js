import React, { Component } from 'react';
import Alert from 'reactstrap/es/Alert';
import Collapse from 'reactstrap/es/Collapse';
import PageTitle from '../../../primitive/PageTitle/PageTitle';
import InputGroup from 'reactstrap/es/InputGroup';
import Input from 'reactstrap/es/Input';
import { InputGroupAddon } from 'reactstrap';
import { quickConnect } from '../../../../redux/quick';
import Button from '@material-ui/core/Button';
import { disableProfile } from '../../../../http/tming';
import { errMsg } from '../../../../http/util';

class Escape extends Component {
  state = {
    ok: false,
    pw: ''
  };

  disableAccount = async () => {
    //pw check
    const { uiKit, AuthDispatcher, auth } = this.props;
    const { pw } = this.state;
    if (!pw) {
      uiKit.toaster.cooking('비밀번호를 입력하세요');
      return;
    }

    uiKit.loading.start();
    await disableProfile(auth)
      .then(response => {
        uiKit.popup.make(
          <div>
            <h3>티밍을 이용해주셔서 감사합니다</h3>
            <p>
              회원탈퇴가 완료되었습니다
              <p className={'explain'}>
                탈퇴를 취소하고 싶을 경우, 30일 내로 고객선터로 문의해 주세
              </p>
            </p>
            <br />요
            <Button
              variant={'contained'}
              color={'primary'}
              onClick={() => {
                uiKit.destroyAll();
                AuthDispatcher.logout();
              }}
            >
              홈으로 돌아가기
            </Button>
          </div>,
          true
        );
      })
      .catch(e => {
        uiKit.toaster.cooking(errMsg(e));
      });
    uiKit.loading.end();
  };

  render() {
    const { ok } = this.state;

    return (
      <div>
        <Collapse isOpen={!ok}>
          <Alert color={'danger'}>
            회원탈퇴 신청 후, 계정이 비활성화됩니다
            <br />
            비활성화된 계정은 30일 후 서버에서 완전히 삭제됩니다
            <br />
            <br />
            <Button
              fullWidth
              variant={'contained'}
              color={'secondary'}
              onClick={() => {
                this.setState({
                  ...this.state,
                  ok: true
                });
              }}
            >
              알겠습니다. 계속 진행해 주십시오.
            </Button>
          </Alert>
        </Collapse>
        <Collapse isOpen={ok}>
          <Alert color={'danger'}>
            <PageTitle
              title={'계정의 패스워드를 입력해 주십시오'}
              explain={'본인 확인이 완료되면 탈퇴가 승인됩니다'}
              titleColor={'#721c24'}
            />
            <br />
            <InputGroup>
              <Input
                type="password"
                placeholder="로그인에 사용한 비밀번호를 입력하세요"
                onChange={e => {
                  this.setState({
                    ...this.state,
                    pw: e.target.value
                  });
                }}
              />
              <InputGroupAddon addonType="append">
                <Button
                  onClick={this.disableAccount}
                  variant={'contained'}
                  color={'secondary'}
                >
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
