import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';
import Button from '@material-ui/core/Button';
import { createMessage } from '../../../http/tming';
import { errMsg } from '../../../http/util';
import { quickConnect } from '../../../redux/quick';

const MessageSender = ({ uiKit, auth, id, username, onClose }) => {
  const [message, setMessage] = useState();
  const sendMessage = async () => {
    uiKit.loading.start();
    await createMessage(auth, id, message)
      .then(response => {
        //ok
        uiKit.toaster.cooking('성공적으로 발송되었습니다');
        onClose();
      })
      .catch(e => {
        uiKit.toaster.cooking(errMsg(e));
      });
    uiKit.loading.end();
  };

  return (
    <div>
      <h3>
        쪽지 보내기
        <p className={'explain'}>{username}</p>
      </h3>
      <br />
      <TextField
        fullWidth
        multiline
        rows={10}
        maxlength={300}
        type={'textarea'}
        onChange={e => {
          const msg = e.target.value;
          setMessage(msg);
        }}
        placeholder={'쪽지 내용을 입력하세요'}
      />
      <br />
      <br />
      <AlignLayout align={'right'}>
        <Button
          startIcon={<SendIcon />}
          onClick={sendMessage}
          variant={'contained'}
          color={'primary'}
        >
          보내기
        </Button>
        &nbsp;&nbsp;
        <Button
          startIcon={<CloseIcon />}
          onClick={() => {
            onClose();
          }}
          variant={'contained'}
        >
          닫기
        </Button>
      </AlignLayout>
    </div>
  );
};

MessageSender.defaultProps = {
  username: '',
  id: '',
  onClose: ()=>{},
};

export default quickConnect(MessageSender);
