import React, { Component } from 'react';
import AlignLayout from '../layouts/AlignLayout/AlignLayout';

import PageTitle from '../components/PageTitle/PageTitle';
import SquareButton from '../components/SquareButton/SquareButton';
import FlexLayout from '../layouts/FlexLayout/FlexLayout';
import logo from '../res/icon.png';
import { getPath } from '../lib/url';

class Index extends Component {
  go = path => {
    this.props.history.push(path);
  };
  render() {
    return (
      <AlignLayout align={'center'}>
        <PageTitle
          title={'티밍에 오신것을 환영합니다'}
          explain={'현재 테스트 기간입니다'}
        />
        <br />
        <FlexLayout margin={'16'} responsive>
          <SquareButton
            img={<img src={logo} alt="" />}
            backgroundColor={'#fc0474'}
            onClick={() => {
              this.go(getPath(`/teambuild`));
            }}
          >
            팀 매칭
          </SquareButton>
          <SquareButton
            backgroundColor={'#03d8fe'}
            img={<img src={logo} alt="" />}
            onClick={() => {
              this.go(getPath(`/chat`));
            }}
          >
            랜덤채팅
          </SquareButton>
        </FlexLayout>
      </AlignLayout>
    );
  }
}

export default Index;
