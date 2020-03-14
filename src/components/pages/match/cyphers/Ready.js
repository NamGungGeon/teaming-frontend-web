import React from 'react';
import PageTitle from '../../../primitive/PageTitle/PageTitle';
import Section from '../../../primitive/Section/Section';
import ButtonSelector from '../../../primitive/ButtonSelector/ButtonSelector';
import ImageSelect from '../../../primitive/ImageSelect/ImageSelect';
import AlignLayout from '../../../layouts/AlignLayout/AlignLayout';
import { cyphersResource } from '../../../../http/cyphers';
import ImageViewGroup from '../../../containers/ImageViewGroup/ImageViewGroup';
import CypherSelect from '../../../containers/CypherSelect/CypherSelect';
import AddIcon from '@material-ui/icons/Add';
import { quickConnect } from '../../../../redux/quick';
import Blinder from '../../../primitive/Blinder/Blinder';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const tiers = [
  {
    img: cyphersResource.getTierIcon('bronze'),
    id: 'bronze',
    label: '브론즈'
  },
  {
    img: cyphersResource.getTierIcon('silver'),
    id: 'silver',
    label: '실버'
  },
  {
    img: cyphersResource.getTierIcon('gold'),
    id: 'gold',
    label: '골드'
  },
  {
    img: cyphersResource.getTierIcon('joker'),
    id: 'joker',
    label: '조커'
  },
  {
    img: cyphersResource.getTierIcon('ace'),
    id: 'ace',
    label: '에이스'
  }
];
const positions = [
  {
    img: cyphersResource.getPositionIcon('tanker'),
    id: 'tanker',
    label: '탱커'
  },
  {
    img: cyphersResource.getPositionIcon('assassin'),
    id: 'assassin',
    label: '근거리딜러'
  },
  {
    img: cyphersResource.getPositionIcon('ad'),
    id: 'ad',
    label: '원거리딜러'
  },
  {
    img: cyphersResource.getPositionIcon('supporter'),
    id: 'supporter',
    label: '서포터'
  }
];
const Ready = ({ playerInfo, setPlayerInfo, uiKit, history }) => {
  const handleChange = e => {
    setPlayerInfo({
      ...playerInfo,
      [e.target.name]: e.target.value
    });
  };

  const {
    tier,
    partnerGender,
    mode,
    goal,
    nickname,
    champions,
    likes,
    partnerPos,
    mainPos,
    ban
  } = playerInfo;
  const requestMatching = () => {
    if (!nickname) {
      uiKit.toaster.cooking('닉네임을 입력하세요');
      return;
    }
    if (!tier && mode === 'rank') {
      uiKit.toaster.cooking('티어를 선택하세요');
      return;
    }

    uiKit.popup.make(
      <div>
        <h5>아직 개발중이에용~!</h5>
      </div>
    );
    // history.push('/match/battleground/start/');
  };
  return (
    <div>
      <PageTitle
        title={'팀 매칭 사전준비'}
        explain={'사이퍼즈 팀 매칭을 위한 사전 정보 입력'}
        align={'left'}
      />
      <br />
      <Section>
        <div>
          <PageTitle title={'닉네임'} explain={''} noMargin />
          <TextField
            style={{
              width: '400px'
            }}
            name={'nickname'}
            type={'text'}
            placeholder="게임 내에서 사용중인 닉네임을 입력하세요"
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <PageTitle title="상대방 성별" noMargin />
          <ButtonSelector
            items={[
              {
                id: 'all',
                label: '상관없음'
              },
              {
                id: 'same',
                label: '동성'
              },
              {
                id: 'different',
                label: '이성'
              }
            ]}
            defaultItemId={'all'}
            onUpdate={selectedId => {
              setPlayerInfo({
                ...playerInfo,
                partnerGender: selectedId
              });
            }}
          />
        </div>
        <br />
        <div>
          <PageTitle title={'목표'} noMargin />
          <ButtonSelector
            items={[
              {
                id: 'win',
                label: '빡겜',
                color: 'secondary'
              },
              {
                id: 'fun',
                label: '즐겜'
              }
            ]}
            defaultItemId={'win'}
            onUpdate={selectedId => {
              setPlayerInfo({
                ...playerInfo,
                goal: selectedId
              });
            }}
          />
        </div>
        <br />
        <div>
          <PageTitle title={'게임 모드'} noMargin />
          <ButtonSelector
            items={[
              {
                id: 'rank',
                label: '공식',
                color: 'secondary'
              },
              {
                id: 'normal',
                label: '일반'
              }
            ]}
            defaultItemId={'rank'}
            onUpdate={selectedId => {
              setPlayerInfo({
                ...playerInfo,
                mode: selectedId
              });
            }}
          />
        </div>
        <br />
        <Blinder isBlind={mode === 'normal'}>
          <div>
            <PageTitle title={'내 티어'} explain={''} noMargin />
            <ImageSelect
              icons={tiers}
              style={{ justifyContent: 'left' }}
              selections={selection => {
                setPlayerInfo({
                  ...playerInfo,
                  tier: selection
                });
              }}
            />
          </div>
          <br />
        </Blinder>
        <div>
          <PageTitle title={'내 선호 포지션'} explain={''} noMargin />
          <ImageSelect
            inits={[mainPos]}
            icons={positions}
            style={{ justifyContent: 'left' }}
            selections={selection => {
              setPlayerInfo({
                ...playerInfo,
                mainPos: selection
              });
            }}
          />
        </div>
        <br />
        <div>
          <PageTitle title={'내 선호 사이퍼'} />
          <ImageViewGroup
            style={{ justifyContent: 'left' }}
            icons={[
              ...champions.map(cypher => {
                return {
                  img: cyphersResource.getClearThumbnail(cypher),
                  label: cypher.nameKR,
                  id: cypher.nameKR
                };
              }),
              {
                img: <AddIcon style={{ fontSize: '48px' }} />,
                onClick: () => {
                  uiKit.popup.make(
                    <CypherSelect
                      onUpdate={selects => {
                        setPlayerInfo({
                          ...playerInfo,
                          champions: selects
                        });
                      }}
                      inits={champions}
                      popup
                    />
                  );
                }
              }
            ]}
          />
        </div>
        <br />
        <div>
          <PageTitle title={'파트너 선호 포지션'} explain={''} noMargin />
          <ImageSelect
            inits={[partnerPos]}
            icons={positions}
            style={{ justifyContent: 'left' }}
            selections={selection => {
              setPlayerInfo({
                ...playerInfo,
                partnerPos: selection
              });
            }}
          />
        </div>
        <br />
        <div>
          <PageTitle title={'파트너 선호 사이퍼'} />
          <ImageViewGroup
            style={{ justifyContent: 'left' }}
            icons={[
              ...likes.map(cypher => {
                return {
                  img: cyphersResource.getClearThumbnail(cypher),
                  label: cypher.nameKR,
                  id: cypher.nameKR
                };
              }),
              {
                img: <AddIcon style={{ fontSize: '48px' }} />,
                onClick: () => {
                  uiKit.popup.make(
                    <CypherSelect
                      onUpdate={selects => {
                        setPlayerInfo({
                          ...playerInfo,
                          likes: selects
                        });
                      }}
                      inits={likes}
                      popup
                    />
                  );
                }
              }
            ]}
          />
        </div>
        <br />
        <div>
          <PageTitle title={'파트너 금지 사이퍼'} />
          <ImageViewGroup
            style={{ justifyContent: 'left' }}
            icons={[
              ...ban.map(cypher => {
                return {
                  img: cyphersResource.getClearThumbnail(cypher),
                  label: cypher.nameKR,
                  id: cypher.nameKR
                };
              }),
              {
                img: <AddIcon style={{ fontSize: '48px' }} />,
                onClick: () => {
                  uiKit.popup.make(
                    <CypherSelect
                      onUpdate={selects => {
                        setPlayerInfo({
                          ...playerInfo,
                          ban: selects
                        });
                      }}
                      inits={ban}
                      popup
                    />
                  );
                }
              }
            ]}
          />
        </div>
        <br />
        <AlignLayout align={'right'}>
          <Button
            onClick={requestMatching}
            fullWidth
            variant={'contained'}
            color={'primary'}
          >
            시작 &gt;
          </Button>
        </AlignLayout>
        <br />
      </Section>
    </div>
  );
};

export default quickConnect(Ready);
