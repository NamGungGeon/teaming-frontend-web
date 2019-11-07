import React from 'react';
import AlignLayout from '../layouts/AlignLayout/AlignLayout';

import PageTitle from '../components/PageTitle/PageTitle';
import SquareButton from '../components/SquareButton/SquareButton';
import FlexLayout from '../layouts/FlexLayout/FlexLayout';
import { getPath } from '../lib/url';

export default function Index(props) {
  const go = path => {
    props.history.push(path);
  };

  return (
    <AlignLayout align="center">
      <PageTitle
        title="티밍에 오신것을 환영합니다"
        explain="현재 테스트 기간입니다"
      />
      <FlexLayout margin="16" responsive>
        <SquareButton
          backgroundColor="#fc0474"
          onClick={() => {
            go(getPath(`/teambuild`));
          }}
        >
          팀 매칭
        </SquareButton>
        <SquareButton
          backgroundColor="#03d8fe"
          onClick={() => {
            go(getPath(`/chat`));
          }}
        >
          랜덤채팅
        </SquareButton>
      </FlexLayout>
    </AlignLayout>
  );
}
