import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import CloseIcon from '@material-ui/icons/Close';
import ReportIcon from '@material-ui/icons/Report';
import { getPath, resPath } from '../../../../utils/url';
import Window from '../../../primitive/Window/Window';
import { quickConnect } from '../../../../redux/quick';
import getHistory from 'react-router-global-history';
import QuickComplain from '../../../containers/QuickComplain/QuickComplain';
import ImageView from '../../../primitive/ImageView/ImageView';
import ImageViewGroup from '../../../containers/ImageViewGroup/ImageViewGroup';
import { championSquareImage } from '../../../../http/lol';

const Tools = ({ refresher, uiKit, partner }) => {
  const playerInfo = partner ? partner.playerInfo : null;
  console.log('partner', partner);

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
                  uiKit.toaster.cooking('신고가 완료되었습니다. 재매칭을 시도합니다.');
                  uiKit.popup.destroy();
                  refresher();
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
                  uiKit.toaster.cooking('차단 및 신고가 완료되었습니다. 재매칭을 시도합니다');
                  uiKit.popup.destroy();
                  refresher();
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
            getHistory().push(getPath('/'));
          }}
        >
          나가기
        </Button>
      </ButtonGroup>
      <br />
      <br />
      {partner && (
        <Window title={'상대방 정보'} foldable>
          {
            //partner
            // playerInfo:
            //   tier: ""
            // champions: ["Ekko"]
            // ban: []
            // likes: []
            // mainPos: "bottom"
            // partnerPos: "mid"
            // nickname: "ㄴㅇㄹㅎㄴㅇㅎㄴㅇ"
            // mode: "normal"
            // goal: "win"
          }
          {playerInfo.nickname && (
            <p>
              <h5>상대방 닉네임</h5>
              {playerInfo.nickname}
            </p>
          )}
          {playerInfo.tier && (
            <p>
              <h5>상대방 티어</h5>
              <ImageView img={`${resPath}/tier/${playerInfo.tier}.png`} />
            </p>
          )}
          {playerInfo.tier && (
            <p>
              <h5>상대방 주 라인</h5>
              <ImageView img={`${resPath}/tier/${playerInfo.tie}.png`} />
            </p>
          )}
          {playerInfo.champions.length !== 0 && (
            <p>
              <h5>상대방 주 챔피언</h5>
              <ImageViewGroup
                styles={{
                  justifyContent: 'flex-start'
                }}
                icons={playerInfo.champions.map(champ => {
                  return {
                    img: championSquareImage(champ),
                    style: {
                      width: '36px'
                    }
                  };
                })}
              />
            </p>
          )}
          {playerInfo.ban.length !== 0 && (
            <p>
              <h5>상대방 금지 챔피언</h5>
              <ImageViewGroup
                styles={{
                  justifyContent: 'flex-start'
                }}
                icons={playerInfo.ban.map(champ => {
                  return {
                    img: championSquareImage(champ),
                    style: {
                      width: '36px',
                      filter: 'grayscale(1)'
                    }
                  };
                })}
              />
            </p>
          )}
          {playerInfo.likes.length !== 0 && (
            <p>
              <h5>상대방 선호 챔피언</h5>
              <ImageViewGroup
                styles={{
                  justifyContent: 'flex-start'
                }}
                icons={playerInfo.likes.map(champ => {
                  return {
                    img: championSquareImage(champ),
                    style: {
                      width: '36px'
                    }
                  };
                })}
              />
            </p>
          )}
        </Window>
      )}
    </div>
  );
};

Tools.defaultProps = {
  partner: null
};
export default quickConnect(Tools);
