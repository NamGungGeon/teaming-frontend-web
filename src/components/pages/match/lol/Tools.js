import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import CloseIcon from '@material-ui/icons/Close';
import ReportIcon from '@material-ui/icons/Report';
import { getPath } from '../../../../utils/url';
import Window from '../../../primitive/Window/Window';
import { quickConnect } from '../../../../redux/quick';
import getHistory from 'react-router-global-history';
import QuickComplain from '../../../containers/QuickComplain/QuickComplain';

const Tools = ({ refresher, uiKit }) => {
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
          onClick={refresher}
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
                  uiKit.toaster.cooking('신고가 완료되었습니다');
                  uiKit.popup.destroy();
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
          onClick={() => {}}
        >
          상대방 차단
        </Button>
        <Button
          startIcon={<CloseIcon />}
          variant={'contained'}
          color={'secondary'}
          fullWidth
          onClick={() => {
            getHistory().push(getPath('/'));
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
};
export default quickConnect(Tools);
