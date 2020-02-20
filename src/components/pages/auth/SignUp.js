import React, { Component } from 'react';
import PageTitle from '../../primitive/PageTitle/PageTitle';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';
import { Validator } from 'class-validator';
import { quickConnect } from '../../../redux/quick';
import { signup } from '../../../http/tming';
import { errMsg } from '../../../http/util';
import { getPath } from '../../../utils/url';
import { contact, privacy } from '../../../utils/strings';
import { authorized } from '../../../utils/utils';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import HashTable from '../../primitive/HashTable/HashTable';
import Section from '../../primitive/Section/Section';
import Checkbox from '@material-ui/core/Checkbox';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

class SignUp extends Component {
  state = {
    email: '',
    gender: 'M',
    nickname: '',
    pw: '',
    pwCheck: '',

    agreePrivacy: false,
    agreeContact: false
  };
  validator = new Validator();

  componentDidMount() {
    const { auth, history } = this.props;
    if (authorized(auth)) {
      history.push(getPath(`/`));
    }
  }

  componentWillUnmount() {
    this.props.uiKit.destroyAll();
  }
  submit = async () => {
    const { uiKit, history, AuthDispatcher } = this.props;
    const {
      email,
      gender,
      nickname,
      pw,
      pwCheck,
      agreePrivacy,
      agreeContact
    } = this.state;
    if (!email || !this.validator.isEmail(email)) {
      uiKit.toaster.cooking('이메일 형식을 다시 확인하세요');
      return;
    }
    if (!pw) {
      uiKit.toaster.cooking('비밀번호를 입력하세요');
      return;
    }
    if (pw !== pwCheck) {
      uiKit.toaster.cooking('비밀번호와 비밀번호 확인이 일치하지 않습니다');
      return;
    }
    if (!nickname || nickname.length > 32) {
      uiKit.toaster.cooking('닉네임은 32자 이하로 작성해주세요');
      return;
    }
    if (!agreePrivacy) {
      uiKit.toaster.cooking('개인정보처리방침에 동의해 주세요');
      return;
    }
    if (!agreeContact) {
      uiKit.toaster.cooking('이용약관에 동의해 주세요');
      return;
    }

    uiKit.loading.start();
    await signup(email, pw, nickname, gender)
      .then(response => {
        const { id, access, refresh } = response.data;
        AuthDispatcher.login({
          token: access,
          refresh,
          id: id
        });
        uiKit.popup.make(
          <div>
            <h4>회원가입이 완료되었습니다</h4>
            <br />
            <AlignLayout align={'right'}>
              <Button
                startIcon={<VpnKeyIcon />}
                color={'primary'}
                variant={'contained'}
                onClick={() => {
                  uiKit.popup.destroy();
                  history.push(getPath(`/`));
                }}
              >
                홈 화면으로 이동
              </Button>
            </AlignLayout>
          </div>,
          true
        );
      })
      .catch(e => {
        uiKit.toaster.cooking(errMsg(e));
      });
    uiKit.loading.end();
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };
  handleChecked = e => {
    const { name, checked } = e.target;
    this.setState({
      ...this.state,
      [name]: checked
    });
  };

  render() {
    const { gender, privacyAgree, contactAgree } = this.state;
    return (
      <div>
        <PageTitle
          title={'회원 가입'}
          explain={'얼마 걸리지 않습니다'}
          align={'left'}
        />
        <br />
        <Section>
          <h4>회원정보 입력</h4>
          <br />
          <HashTable
            table={[
              {
                key: '이메일',
                value: (
                  <TextField
                    placeholder={'로그인 시 사용할 이메일을 입력하세요'}
                    fullWidth
                    type={'email'}
                    name={'email'}
                    onChange={this.handleChange}
                  />
                )
              },
              {
                key: '비밀번호',
                value: (
                  <TextField
                    placeholder={'로그인 시 사용할 비밀번호를 입력하세요'}
                    fullWidth
                    name={'pw'}
                    type={'password'}
                    onChange={this.handleChange}
                  />
                )
              },
              {
                key: '비밀번호 확인',
                value: (
                  <TextField
                    placeholder={'비밀번호와 동일하게 입력하세요'}
                    fullWidth
                    name={'pwCheck'}
                    type={'password'}
                    onChange={this.handleChange}
                  />
                )
              },
              {
                key: '성별',
                value: (
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="gender"
                      name="gender1"
                      value={gender}
                    >
                      <FormControlLabel
                        value="M"
                        control={<Radio color={'primary'} />}
                        label="남자"
                        onClick={() => {
                          this.setState({ ...this.state, gender: 'M' });
                        }}
                      />
                      <FormControlLabel
                        value="F"
                        control={<Radio color={'secondary'} />}
                        label="여자"
                        onClick={() => {
                          this.setState({ ...this.state, gender: 'F' });
                        }}
                      />
                    </RadioGroup>
                  </FormControl>
                )
              },
              {
                key: '닉네임',
                value: (
                  <TextField
                    placeholder={'티밍에서 사용할 닉네임을 입력하세요'}
                    fullWidth
                    type={'text'}
                    name={'nickname'}
                    onChange={this.handleChange}
                  />
                )
              }
            ]}
          />
        </Section>
        <br />
        <Section>
          <h4>필수동의약관</h4>
          <br />
          <div>
            <h6>개인정보처리방침</h6>
            <div
              style={{
                overflowY: 'scroll',
                height: '300px',
                backgroundColor: '#e9e9e9',
                border: '1px solid #e9e9e9',
                padding: '8px'
              }}
            >
              {privacy}
            </div>
            <FormControlLabel
              onChange={this.handleChecked}
              name={'privacyAgree'}
              checked={privacyAgree}
              control={<Checkbox value="checkedB" color="primary" />}
              label="약관에 동의합니다"
            />
          </div>
          <br />
          <div>
            <h6>이용약관</h6>
            <div
              style={{
                overflowY: 'scroll',
                height: '300px',
                backgroundColor: '#e9e9e9',
                border: '1px solid #e9e9e9',
                padding: '8px'
              }}
            >
              {contact}
            </div>
            <FormControlLabel
              onChange={this.handleChecked}
              name={'contactAgree'}
              checked={contactAgree}
              control={<Checkbox value="checkedB" color="primary" />}
              label="약관에 동의합니다"
            />
          </div>
        </Section>
        <br />
        <AlignLayout align={'right'}>
          <Button
            startIcon={<PersonAddIcon />}
            variant={'contained'}
            color={'primary'}
            onClick={this.submit}
            size={'large'}
          >
            가입 신청
          </Button>
        </AlignLayout>
      </div>
    );
  }
}

export default quickConnect(SignUp);
