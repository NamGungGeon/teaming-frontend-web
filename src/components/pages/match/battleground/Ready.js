import React from 'react';
import PageTitle from '../../../primitive/PageTitle/PageTitle';
import Section from '../../../primitive/Section/Section';
import Input from 'reactstrap/es/Input';
import { Button } from 'reactstrap';
import Collapse from 'reactstrap/es/Collapse';
import AlignLayout from '../../../layouts/AlignLayout/AlignLayout';
import ButtonSelector from '../../../primitive/ButtonSelector/ButtonSelector';
import ImageSelect from '../../../primitive/ImageSelect/ImageSelect';

import { battlegroundResource } from '../../../../http/battleground';
import { quickConnect } from '../../../../redux/quick';

const tierIcons = [
  {
    img: battlegroundResource.tierImage('bronze'),
    id: 'bronze',
    label: '브론즈'
  },
  {
    img: battlegroundResource.tierImage('silver'),
    id: 'silver',
    label: '실버'
  },
  {
    img: battlegroundResource.tierImage('gold'),
    id: 'gold',
    label: '골드'
  },
  {
    img: battlegroundResource.tierImage('platinum'),
    id: 'platinum',
    label: '플래티넘'
  },
  {
    img: battlegroundResource.tierImage('diamond'),
    id: 'diamond',
    label: '다이아몬드'
  },
  {
    img: battlegroundResource.tierImage('master'),
    id: 'master',
    label: '마스터'
  },
  {
    img: battlegroundResource.tierImage('grandmaster'),
    id: 'grandmaster',
    label: '그랜드마스터'
  }
];

const Ready = ({ playerInfo, setPlayerInfo, uiKit, history }) => {
  const handleChange = e => {
    setPlayerInfo({
      ...playerInfo,
      [e.target.name]: e.target.value
    });
  };
  const requestMatching = () => {
    const { tier, partnerGender, mode, goal, nickname } = playerInfo;
    if (!nickname) {
      uiKit.toaster.cooking('닉네임을 입력하세요');
      return;
    }
    if (!tier && mode === 'rank') {
      uiKit.toaster.cooking('티어를 선택하세요');
      return;
    }

    history.push('/match/battleground/start/');
  };

  const { tier, partnerGender, mode, goal, nickname } = playerInfo;
  return (
    <div>
      <PageTitle
        title={'팀 매칭 사전준비'}
        explain={'배틀그라운드 팀 매칭을 위한 사전 정보 입력'}
        align={'left'}
      />
      <br />
      <Section style={{ textAlign: 'left' }}>
        <div>
          <div
            style={{
              display: 'inline-block',
              maxWidth: '350px',
              width: '100%'
            }}
          >
            <PageTitle title={'닉네임'} explain={''} noMargin />
            <Input
              className={'transparent'}
              width={'400px'}
              value={nickname}
              name={'nickname'}
              type="text"
              placeholder="게임 내에서 사용중인 닉네임을 입력하세요"
              onChange={handleChange}
            />
          </div>
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
                color: 'danger'
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
                label: '랭크',
                color: 'danger'
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
        <Collapse isOpen={mode !== 'normal'}>
          <div>
            <PageTitle title={'내 티어'} explain={''} noMargin />
            <ImageSelect
              icons={tierIcons}
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
        </Collapse>
        <AlignLayout align={'right'}>
          <Button
            onClick={requestMatching}
            block
            color={'primary'}
            size={'large'}
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
