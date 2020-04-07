import React, { useState } from 'react';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { quickConnect } from '../../../redux/quick';
import AddIcon from '@material-ui/icons/Add';

const CreateRoom = ({
  onCreate: handleCreate,
  onCreateFail: handleCreateFail,
  onCancel: handleCancel
}) => {
  const [title, setTitle] = useState('');

  const create = () => {
    if (title.length < 3) {
      handleCreateFail('채팅방 이름은 3글자 이상이여야 합니다');
      return;
    }
    handleCreate(title);
  };

  const handleChangeTitle = event => {
    setTitle(event.target.value);
  };

  return (
    <div>
      <h3>새로운 채팅방을 만듭니다</h3>
      <br />
      <TextField
        fullWidth
        placeholder="채팅방 제목을 입력하세요"
        onChange={handleChangeTitle}
      />
      <br />
      <br />
      <AlignLayout align="right">
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={create}
          color="primary"
        >
          생성
        </Button>
        &nbsp;&nbsp;
        <Button onClick={handleCancel}>닫기</Button>
      </AlignLayout>
    </div>
  );
};

export default quickConnect(CreateRoom);
