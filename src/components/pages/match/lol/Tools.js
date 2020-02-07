import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import CloseIcon from '@material-ui/icons/Close';
import ReportIcon from '@material-ui/icons/Report';
import { getPath } from '../../../../utils/url';
import Window from '../../../primitive/Window/Window';

export default function Tools({ history }) {
  return (
    <div>
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined primary button group"
        fullWidth
      >
        <Button
          startIcon={<RefreshIcon />}
          variant={'contained'}
          color={'primary'}
          onClick={() => {
            this.endChat();
            this.init();
          }}
          fullWidth
        >
          재매칭
        </Button>
        <Button
          startIcon={<ReportIcon />}
          variant={'contained'}
          color={'secondary'}
          fullWidth
          onClick={() => {}}
        >
          신고하기
        </Button>
        <Button
          startIcon={<CloseIcon />}
          variant={'contained'}
          color={'primary'}
          fullWidth
          onClick={() => {
            history.push(getPath('/'));
          }}
        >
          나가기
        </Button>
      </ButtonGroup>
      <br />
      <br />
      <Window title={'상대방 정보'} foldable>
        이곳에 상대방 정보가 표시됩니다
      </Window>
    </div>
  );
}
