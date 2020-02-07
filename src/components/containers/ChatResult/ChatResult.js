import React, { useState } from 'react';
import PageTitle from '../../primitive/PageTitle/PageTitle';
import { Rating } from '@material-ui/lab';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';
import { Button } from '@material-ui/core';

const ChatResult = ({ close }) => {
  const [rating, setRating] = useState(5);

  return (
    <div>
      <PageTitle
        title={'매칭 결과에 대한 만족도 조사'}
        explain={'높은 만족도를 제공하기 위해 제출해주시면 감사드리겠습니다'}
      />
      <br />
      <AlignLayout align={'center'}>
        <Rating
          style={{
            textAlign: 'center'
          }}
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
      </AlignLayout>
      <br />
      <AlignLayout align={'right'}>
        <Button
          onClick={() => {
            close();
          }}
          color={'primary'}
          variant={'contained'}
        >
          제출
        </Button>
        &nbsp;&nbsp;
        <Button
          onClick={() => {
            close();
          }}
          color={'secondary'}
          variant={'contained'}
        >
          닫기
        </Button>
      </AlignLayout>
    </div>
  );
};

export default ChatResult;
