import React, { Component } from 'react';
import PageTitle from '../../primitive/PageTitle/PageTitle';
import Wysiwyg from '../../primitive/WYSIWYG/WYSIWYG';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';
import { Button } from '@material-ui/core';
import { createCase } from '../../../http/tming';
import Optional from '../../primitive/Optional/Optional';
import Input from 'reactstrap/es/Input';
import { authorized } from '../../../utils/utils';
import { Validator } from 'class-validator';
import { errMsg } from '../../../http/util';
import { quickConnect } from '../../../redux/quick';

class CreateCase extends Component {
  state = {
    email: '',
    title: ''
  };

  componentDidMount() {
    const { history } = this.props;
    this.unblock = history.block('작성한 내용이 사라집니다');
  }
  componentWillUnmount() {
    this.unblock();
  }

  submit = async () => {
    const { email, title } = this.state;
    const { uiKit, auth, history } = this.props;
    const data = this.editor.getBody();

    //check params
    if (!data.body) {
      uiKit.toaster.cooking('내용을 입력하세요');
      return;
    }
    if (!authorized(auth) && !email) {
      uiKit.toaster.cooking('답장을 받을 이메일을 입력하세요');
      return;
    }
    if (email && !new Validator().isEmail(email)) {
      uiKit.toaster.cooking('이메일 형식이 올바르지 않습니다');
      return;
    }

    uiKit.loading.start();
    await createCase(auth, title, data.body, data.media, email)
      .then(response => {
        //ok
        uiKit.toaster.cooking('접수 완료');
        this.unblock();
        history.goBack();
      })
      .catch(e => {
        console.log(e);
        uiKit.toaster.cooking(errMsg(e));
      });
    uiKit.loading.end();
  };

  render() {
    const { auth } = this.props;

    return (
      <div>
        <PageTitle
          title={'문의 작성'}
          explain={'최대한 자세하게 문제를 묘사해 주세요'}
        />
        <br />
        <Optional visible={!authorized(auth)}>
          <Input
            type="email"
            placeholder="답장을 받을 이메일 주소를 입력하세요"
            onChange={e => {
              this.setState({
                ...this.state,
                email: e.target.value
              });
            }}
          />
          <br />
        </Optional>
        <Input
          type="text"
          placeholder="문의 제목을 입력하세요"
          onChange={e => {
            this.setState({
              ...this.state,
              title: e.target.value
            });
          }}
        />
        <br />
        <Wysiwyg ref={ref => (this.editor = ref)} />
        <br />
        <AlignLayout align={'right'}>
          <Button onClick={this.submit} variant={'contained'} color={'primary'}>
            접수
          </Button>
        </AlignLayout>
      </div>
    );
  }
}

export default quickConnect(CreateCase);
