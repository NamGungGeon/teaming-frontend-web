import React, { useState } from 'react';
import { quickConnect } from '../../../../redux/quick';
import { TextField } from '@material-ui/core';
import AlignLayout from '../../../layouts/AlignLayout/AlignLayout';
import Button from '@material-ui/core/Button';
import { createComment } from '../../../../http/cyphers';

const CreateCypherComment = ({ nameEN, nameKR, onSubmit, uiKit }) => {
  const [comment, setComment] = useState('');
  const submit = async () => {
    if (!comment) {
      uiKit.toaster.cooking('코멘트 내용을 입력하세요');
      return;
    }
    if (comment.length > 100) {
      uiKit.toaster.cooking(
        '코멘트 내용은 최대 100자까지만 입력할 수 있습니다'
      );
      return;
    }

    uiKit.loading.start();
    await createComment(nameEN, comment)
      .then(response => {
        uiKit.toaster.cooking('작성이 완료되었습니다');
        onSubmit();
      })
      .catch(e => {
        uiKit.toaster.cooking(e);
      });
    uiKit.loading.end();
  };

  return (
    <div>
      <h3>{nameKR}에 대한 코멘트를 작성합니다</h3>
      <br />
      <TextField
        onChange={e => {
          setComment(e.target.value);
        }}
        placeholder={'제발이상한것좀쓰지마얘들아 삭제하기너무힘들어'}
        fullWidth
        multiline
        rows={7}
        type={'text'}
      />
      <br />
      <br />
      <AlignLayout align={'right'}>
        <Button variant={'contained'} color={'primary'} onClick={submit}>
          작성
        </Button>
      </AlignLayout>
    </div>
  );
};

export default quickConnect(CreateCypherComment);
