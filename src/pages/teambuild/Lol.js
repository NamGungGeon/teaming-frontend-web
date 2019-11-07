import React, { Component } from 'react';
import FormWrapper from '../../components/FormWrapper/FormWrapper';
import PageTitle from '../../components/PageTitle/PageTitle';

import bronze from '../../res/lol/tier/bronze.png';
import silver from '../../res/lol/tier/silver.png';
import gold from '../../res/lol/tier/gold.png';
import platinum from '../../res/lol/tier/platinum.png';
import diamond from '../../res/lol/tier/diamond.png';
import master from '../../res/lol/tier/master.png';
import grandmaster from '../../res/lol/tier/grandmaster.png';
import challenger from '../../res/lol/tier/challenger.png';

import top from '../../res/lol/line/top.png';

import plus from '../../res/plus.png';

import ImageSelect from '../../components/ImageSelect/ImageSelect';
import ImageViewGroup from '../../containers/ImageViewGroup/ImageViewGroup';
import { Button } from '@material-ui/core';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';
import { quickConnect } from '../../redux';
import ChampionSelect from '../../containers/ChampionSelect/ChampionSelect';
import { getPath } from '../../lib/url';

class Lol extends Component {
  state = {
    gameType: 'rank',
    tier: '',
    champions: [],
    ban: [],
    mainPos: '',
    subPos: ''
  };

  openChampions = (inits, updater) => {
    const { uiKit } = this.props;

    uiKit.popup.make(
      <ChampionSelect selections={updater} inits={inits} popup />
    );
  };

  requestStart = () => {
    const { uiKit, history } = this.props;
    const { tier, champions, mainPos, subPos } = this.state;
    if (!tier) {
      uiKit.toaster.cooking('티어를 선택하세요');
      return;
    }
    if (champions.length === 0) {
      uiKit.toaster.cooking('챔피언을 하나 이상 선택하세요');
      return;
    }
    if (!mainPos) {
      uiKit.toaster.cooking('메인 라인을 선택하세요');
      return;
    }
    if (!subPos) {
      uiKit.toaster.cooking('서브 라인을 선택하세요');
      return;
    }

    history.push(getPath(`/teambuild/lol/build`));
  };

  render() {
    return (
      <div>
        <PageTitle
          title={'팀 매칭 사전준비'}
          explain={'리그 오브 레전드 팀 매칭을 위한 사전 정보 입력'}
          centering
        />
        <FormWrapper>
          <div>
            <PageTitle title={'티어'} explain={''} noMargin />
            <ImageSelect
              icons={[
                { img: bronze, id: 'bronze', label: '브론즈' },
                { img: silver, id: 'silver', label: '실버' },
                { img: gold, id: 'gold', label: '골드' },
                { img: platinum, id: 'platinum', label: '플래티넘' },
                { img: diamond, id: 'diamond', label: '다이아몬드' },
                { img: master, id: 'master', label: '마스터' },
                { img: grandmaster, id: 'grandmaster', label: '그랜드마스터' },
                { img: challenger, id: 'challenger', label: '챌린저' }
              ]}
              style={{ justifyContent: 'left' }}
              selections={selection => {
                this.setState({ ...this.state, tier: selection });
              }}
            />
          </div>
          <div>
            <PageTitle title={'메인 라인'} explain={''} noMargin />
            <ImageSelect
              icons={[
                { img: top, id: 'top', label: '탑' },
                { img: top, id: 'mid', label: '미드' },
                { img: top, id: 'bottom', label: '바텀' },
                { img: top, id: 'jungle', label: '정글' },
                { img: top, id: 'supporter', label: '서포터' },
                { img: top, id: 'all', label: '상관없음' }
              ]}
              style={{ justifyContent: 'left' }}
              selections={selection => {
                this.setState({ ...this.state, mainPos: selection });
              }}
            />
          </div>
          <div>
            <PageTitle title={'서브 라인'} explain={''} noMargin />
            <ImageSelect
              icons={[
                { img: top, id: 'top', label: '탑' },
                { img: top, id: 'mid', label: '미드' },
                { img: top, id: 'bottom', label: '바텀' },
                { img: top, id: 'jungle', label: '정글' },
                { img: top, id: 'supporter', label: '서포터' },
                { img: top, id: 'all', label: '상관없음' }
              ]}
              style={{ justifyContent: 'left' }}
              selections={selection => {
                this.setState({ ...this.state, subPos: selection });
              }}
            />
          </div>
          <div>
            <PageTitle
              title={'챔피언'}
              explain={'플레이할 챔피언을 선택해주세요 (1개 이상)'}
              noMargin
            />
            <ImageViewGroup
              icons={[
                ...this.state.champions.map(select => {
                  return {
                    img: require(`../../res/lol/champions/${select}.png`)
                  };
                }),
                {
                  img: plus,
                  label: '',
                  onClick: () => {
                    this.openChampions(this.state.champions, selections => {
                      this.setState({
                        ...this.state,
                        champions: selections
                      });
                    });
                  },
                  width: '32px'
                }
              ]}
              style={{ justifyContent: 'left' }}
              width={'64px'}
            />
          </div>
          <div>
            <PageTitle
              title={'금지 챔피언'}
              explain={'이 챔피언을 선택한 유저와는 매칭되지 않습니다'}
              noMargin
            />
            <ImageViewGroup
              icons={[
                ...this.state.ban.map(select => {
                  return {
                    img: require(`../../res/lol/champions/${select}.png`)
                  };
                }),
                {
                  img: plus,
                  label: '',
                  onClick: () => {
                    this.openChampions(this.state.ban, selections => {
                      this.setState({
                        ...this.state,
                        ban: selections
                      });
                    });
                  },
                  width: '32px'
                }
              ]}
              style={{ justifyContent: 'left' }}
              width={'64px'}
            />
          </div>
          <AlignLayout align={'right'}>
            <Button
              color={'primary'}
              variant={'contained'}
              size={'large'}
              onClick={this.requestStart}
            >
              시작 &gt;
            </Button>
          </AlignLayout>
        </FormWrapper>
        <br />
      </div>
    );
  }
}

export default quickConnect(Lol);
