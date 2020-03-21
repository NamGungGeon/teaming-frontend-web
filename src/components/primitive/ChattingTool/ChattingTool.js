import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import QuickComplain from '../../containers/QuickComplain/QuickComplain';
import getHistory from 'react-router-global-history';
import CloseIcon from '@material-ui/icons/Close';
import ReportIcon from '@material-ui/icons/Report';
import Window from '../Window/Window';

const ChattingTool = ({ rematching, uiKit, partnerInfo }) => {
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
          onClick={rematching}
          fullWidth
        >
          재매칭
        </Button>
        <Button
          startIcon={<ReportIcon />}
          variant={'contained'}
          color={'secondary'}
          fullWidth
          onClick={() => {
            uiKit.popup.make(
              <QuickComplain
                onFinished={() => {
                  uiKit.toaster.cooking(
                    '신고가 완료되었습니다. 재매칭을 시도합니다.'
                  );
                  uiKit.popup.destroy();
                  rematching();
                }}
              />
            );
          }}
        >
          신고하기
        </Button>
        <Button
          startIcon={<ReportIcon />}
          variant={'contained'}
          color={'primary'}
          fullWidth
          onClick={() => {
            uiKit.popup.make(
              <QuickComplain
                onFinished={() => {
                  uiKit.toaster.cooking(
                    '차단 및 신고가 완료되었습니다. 재매칭을 시도합니다'
                  );
                  uiKit.popup.destroy();
                  rematching();
                }}
              />
            );
          }}
        >
          상대방 차단
        </Button>
        <Button
          startIcon={<CloseIcon />}
          variant={'contained'}
          color={'secondary'}
          fullWidth
          onClick={() => {
            getHistory().push('/');
          }}
        >
          나가기
        </Button>
      </ButtonGroup>
      <br />
      <br />
      <Window title={'상대방 정보'} foldable>
        {partnerInfo ? partnerInfo : '표시할 정보가 없습니다'}
      </Window>
    </div>
  );
};

export default ChattingTool;
