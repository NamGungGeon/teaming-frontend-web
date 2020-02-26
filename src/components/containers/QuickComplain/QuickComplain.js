import React, { Component, useState } from 'react';
import { quickConnect } from '../../../redux/quick';
import PageTitle from '../../primitive/PageTitle/PageTitle';
import { Button, TextField } from '@material-ui/core';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';
import ReportIcon from '@material-ui/icons/Report';
import { delay } from '../../../utils/utils';

const QuickComplain = ({ type, id, onFinished, auth, uiKit }) => {
  const [body, setBody] = useState('');
  const submitComplain = async () => {
    uiKit.loading.start();
    await delay(1200);
    uiKit.loading.end();
  };

  return (
    <div>
      <PageTitle title={'신고하기'} explain={'신고 내용을 작성해주세요'} />
      <br />
      <TextField
        style={{
          width: '100%'
        }}
        fullWidth
        onChange={e => {
          setBody(e.target.value);
        }}
        type="text"
        color={'secondary'}
        placeholder={'허위 신고 시 제재를 받을 수 있습니다'}
      />
      <br />
      <br />
      <AlignLayout align={'right'}>
        <Button
          onClick={async () => {
            await submitComplain();
            onFinished(true);
          }}
          startIcon={<ReportIcon />}
          variant={'contained'}
          color={'secondary'}
        >
          신고하기
        </Button>
      </AlignLayout>
    </div>
  );
};

export default quickConnect(QuickComplain);
