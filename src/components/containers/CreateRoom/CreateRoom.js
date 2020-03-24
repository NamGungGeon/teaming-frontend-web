import React, { useState } from 'react';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';
import Button from '@material-ui/core/Button';
import { delay, randStr } from '../../../utils/utils';
import { TextField } from '@material-ui/core';
import { quickConnect } from '../../../redux/quick';
import AddIcon from '@material-ui/icons/Add';

const CreateRoom = ({ onCreate, onCreateFail, onCancel, uiKit }) => {
  const [title, setTitle] = useState('');

  const create = async () => {
    if (title.length < 3) {
      onCreateFail('채팅방 이름은 3글자 이상이여야 합니다');
      return;
    }

    uiKit.loading.start();
    await delay(1000);
    onCreate(randStr(15));
    uiKit.loading.end();
  };

  return (
    <div>
      <h3>새로운 채팅방을 만듭니다</h3>
      <br />
      <TextField
        fullWidth
        placeholder={'채팅방 제목을 입력하세요'}
        onChange={e => {
          setTitle(e.target.value);
        }}
      />
      <br />
      <br />
      <AlignLayout align={'right'}>
        <Button
          startIcon={<AddIcon />}
          variant={'contained'}
          onClick={create}
          color={'primary'}
        >
          생성
        </Button>
        &nbsp;&nbsp;
        <Button onClick={onCancel}>닫기</Button>
      </AlignLayout>
    </div>
  );
};

CreateRoom.defaultProps = {
  onCreate: roomId => {},
  onCreateFail: e => {},
  onCancel: () => {}
};

export default quickConnect(CreateRoom);
