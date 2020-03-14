import React, { Component } from 'react';
import PageTitle from '../../../primitive/PageTitle/PageTitle';
import { quickConnect } from '../../../../redux/quick';
import { delay } from '../../../../utils/utils';
import AlignLayout from '../../../layouts/AlignLayout/AlignLayout';
import { getPath } from '../../../../utils/url';
import TextField from '@material-ui/core/TextField';
import { updateMyPassword } from '../../../../http/tming';
import { errMsg } from '../../../../http/util';
import getHistory from 'react-router-global-history';
import Button from '@material-ui/core/Button';
import Window from '../../../primitive/Window/Window';
import RefreshIcon from '@material-ui/icons/Refresh';
import HashTable from '../../../primitive/HashTable/HashTable';

class PwChange extends Component {
  state = {
    checked: false
  };

  checking = async () => {
    const { uiKit } = this.props;
    uiKit.loading.start();
    await delay(100);
    uiKit.loading.end();

    this.setState({
      checked: true
    });
  };

  submit = async () => {
    const { uiKit, AuthDispatcher } = this.props;
    uiKit.loading.start();
    await delay(100);
    uiKit.loading.end();

    uiKit.popup.make(
      <AlignLayout align={'center'}>
        <PageTitle
          title={'변경이 완료되었습니다'}
          explain={'재 로그인이 필요합니다'}
          noMargin
        />
        <br />
        <Button
          block
          color={'success'}
          onClick={() => {
            AuthDispatcher.logout();
            getHistory().push(getPath(`/auth/signin`));
          }}
        >
          로그인 페이지로 이동
        </Button>
      </AlignLayout>,
      true
    );
  };

  componentWillUnmount() {
    this.props.uiKit.popup.destroy();
  }

  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  submit = async () => {
    const { uiKit, auth } = this.props;
    const { oldPassword, newPassword, newPasswordCheck } = this.state;

    if (newPassword !== newPasswordCheck) {
      uiKit.toaster.cooking('새 비밀번호와 비밀번호 확인이 일치하지 않습니다');
      return;
    }

    uiKit.loading.start();
    await updateMyPassword(auth, oldPassword, newPassword)
      .then(response => {
        //success
        uiKit.popup.make(
          <div>
            <h5>비밀번호 변경이 완료되었습니다</h5>
            <p className={'explain'}>보안을 위해 재 로그인이 필요합니다</p>
            <br />
            <AlignLayout align={'right'}>
              <Button
                onClick={() => {
                  getHistory().push(getPath('/'));
                }}
                variant={'contained'}
                color={'primary'}
              >
                확인
              </Button>
            </AlignLayout>
          </div>
        );
      })
      .catch(e => {
        uiKit.toaster.cooking(errMsg(e));
      });
    uiKit.loading.end();
  };

  render() {
    /*
      const inputWrapperStyle = {
      display: 'inline-block',
      width: '100%'
      };
     */

    return (
      <div>
        <PageTitle
          title={'비밀번호 변경'}
          explain={'현재 사용중인 비밀번호를 다시 확인합니다'}
        />
        <br />
        <Window>
          <HashTable
            table={[
              {
                key: '현재 사용중인 비밀번호',
                value: (
                  <TextField
                    size={'small'}
                    fullWidth
                    type={'password'}
                    name={'oldPassword'}
                    onChange={this.handleChange}
                  />
                )
              },
              {
                key: '새로 설정할 비밀번호',
                value: (
                  <TextField
                    size={'small'}
                    fullWidth
                    type={'password'}
                    name={'newPassword'}
                    onChange={this.handleChange}
                  />
                )
              },
              {
                key: '새 비밀번호 확인',
                value: (
                  <TextField
                    size={'small'}
                    fullWidth
                    type={'password'}
                    name={'newPasswordCheck'}
                    onChange={this.handleChange}
                  />
                )
              }
            ]}
          />
          <br />
          <br />
          <AlignLayout align={'right'}>
            <Button
              startIcon={<RefreshIcon />}
              variant={'contained'}
              color={'primary'}
              size={'large'}
              onClick={this.submit}
            >
              변경
            </Button>
          </AlignLayout>
        </Window>
      </div>
    );
  }
}

export default quickConnect(PwChange);
