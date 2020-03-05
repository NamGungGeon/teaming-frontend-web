import React, { Component } from 'react';
import Section from '../../../primitive/Section/Section';
import PageTitle from '../../../primitive/PageTitle/PageTitle';

import ImageSelect from '../../../primitive/ImageSelect/ImageSelect';
import ImageViewGroup from '../../../containers/ImageViewGroup/ImageViewGroup';
import AlignLayout from '../../../layouts/AlignLayout/AlignLayout';
import ChampionSelect from '../../../containers/ChampionSelect/ChampionSelect';
import { getPath, resPath } from '../../../../utils/url';
import { Button } from 'reactstrap';
import Input from 'reactstrap/es/Input';
import Collapse from 'reactstrap/es/Collapse';
import ButtonGroup from 'reactstrap/es/ButtonGroup';
import { championSquareImage } from '../../../../http/lol';
import AddIcon from '@material-ui/icons/Add';
import { quickConnect } from '../../../../redux/quick';
import ButtonSelector from '../../../primitive/ButtonSelector/ButtonSelector';

const lines = [
  {
    img: `${resPath}/lol/line/top.png`,
    id: 'top',
    label: '탑',
    style: { width: '48px' }
  },
  {
    img: `${resPath}/lol/line/md.png`,
    id: 'mid',
    label: '미드',
    style: { width: '48px' }
  },
  {
    img: `${resPath}/lol/line/ad.png`,
    id: 'bottom',
    label: '바텀',
    style: { width: '48px' }
  },
  {
    img: `${resPath}/lol/line/jg.png`,
    id: 'jungle',
    label: '정글',
    style: { width: '48px' }
  },
  {
    img: `${resPath}/lol/line/sp.png`,
    id: 'support',
    label: '서포터',
    style: { width: '48px' }
  },
  {
    img: `${resPath}/lol/line/all.png`,
    id: 'all',
    label: '상관없음',
    style: { width: '48px' }
  }
];
const tiers = [
  {
    img: `${resPath}/lol/tier/bronze.png`,
    id: 'bronze',
    label: '브론즈',
    style: { width: '48px' }
  },
  {
    img: `${resPath}/lol/tier/silver.png`,
    id: 'silver',
    label: '실버',
    style: { width: '48px' }
  },
  {
    img: `${resPath}/lol/tier/gold.png`,
    id: 'gold',
    label: '골드',
    style: { width: '48px' }
  },
  {
    img: `${resPath}/lol/tier/platinum.png`,
    id: 'platinum',
    label: '플래티넘',
    style: { width: '48px' }
  },
  {
    img: `${resPath}/lol/tier/diamond.png`,
    id: 'diamond',
    label: '다이아몬드',
    style: { width: '48px' }
  },
  {
    img: `${resPath}/lol/tier/master.png`,
    id: 'master',
    label: '마스터',
    style: { width: '48px' }
  },
  {
    img: `${resPath}/lol/tier/grandmaster.png`,
    id: 'grandmaster',
    label: '그랜드마스터',
    style: { width: '48px' }
  },
  {
    img: `${resPath}/lol/tier/challenger.png`,
    id: 'challenger',
    label: '챌린저',
    style: { width: '48px' }
  }
];

class Ready extends Component {
  constructor(props) {
    super(props);
    const { playerInfo } = this.props;
    this.state = {
      ...playerInfo
    };
  }

  openChampions = (inits, selections) => {
    const { uiKit } = this.props;

    uiKit.popup.make(
      <ChampionSelect id={'open'} selections={selections} inits={inits} popup />
    );
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { setPlayerInfo } = this.props;
    setPlayerInfo(this.state);
  }

  requestStart = () => {
    const { history, uiKit } = this.props;
    const {
      nickname,
      goal,
      mode,
      tier,
      mainPos,
      partnerPos,
      champions
    } = this.state;

    if (!nickname) {
      uiKit.toaster.cooking('롤 닉네임을 입력하세요');
      return;
    }
    if (!goal) {
      uiKit.toaster.cooking('게임 목표를 선택하세요');
      return;
    }
    if (!tier && mode !== 'normal') {
      uiKit.toaster.cooking('랭크/자유랭크 티어를 선택하세요');
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
    if (!partnerPos) {
      uiKit.toaster.cooking('파트너의 라인을 선택하세요');
      return;
    }

    history.push(getPath(`/match/lol/start`));
  };

  render() {
    const { mode, goal, champions, likes, ban, partnerGender } = this.state;

    return (
      <div>
        <PageTitle
          title={'팀 매칭 사전준비'}
          explain={'리그 오브 레전드 팀 매칭을 위한 사전 정보 입력'}
          align={'left'}
        />
        <br />

        <Section>
          <div style={{ textAlign: 'left' }}>
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
                  type="text"
                  placeholder="게임 내에서 사용중인 닉네임을 입력하세요"
                  onChange={e => {
                    this.setState({ ...this.state, nickname: e.target.value });
                  }}
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
                  this.setState({
                    ...this.state,
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
                  this.setState({
                    ...this.state,
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
                    id: 'freerank',
                    label: '자유랭크'
                  },
                  {
                    id: 'normal',
                    label: '일반'
                  }
                ]}
                defaultItemId={'rank'}
                onUpdate={selectedId => {
                  this.setState({
                    ...this.state,
                    mode: selectedId
                  });
                }}
              />
            </div>
            <br />
            <div>
              <Collapse isOpen={mode !== 'normal'}>
                <div>
                  <PageTitle title={'티어'} explain={''} noMargin />
                  <ImageSelect
                    icons={tiers}
                    style={{ justifyContent: 'left' }}
                    selections={selection => {
                      this.setState({ ...this.state, tier: selection });
                    }}
                  />
                </div>
                <br />
              </Collapse>
            </div>
            <Collapse isOpen={mode !== 'chess'}>
              <div>
                <PageTitle title={'메인 라인'} explain={''} noMargin />
                <ImageSelect
                  icons={lines}
                  style={{ justifyContent: 'left' }}
                  selections={selection => {
                    this.setState({ ...this.state, mainPos: selection });
                  }}
                />
              </div>
              <br />
              <div>
                <PageTitle title={'파트너 라인'} explain={''} noMargin />
                <ImageSelect
                  icons={lines}
                  style={{ justifyContent: 'left' }}
                  selections={selection => {
                    this.setState({ ...this.state, partnerPos: selection });
                  }}
                />
              </div>
              <br />
              <div>
                <PageTitle
                  title={'챔피언'}
                  explain={'플레이할 챔피언을 선택해주세요 (1개 이상)'}
                  noMargin
                />
                <ImageViewGroup
                  icons={[
                    ...champions.map(select => {
                      return {
                        img: championSquareImage(select),
                        style: {
                          width: '48px'
                        }
                      };
                    }),
                    {
                      img: <AddIcon style={{ fontSize: '48px' }} />,
                      onClick: () => {
                        this.openChampions(champions, selections => {
                          this.setState({
                            ...this.state,
                            champions: selections
                          });
                        });
                      }
                    }
                  ]}
                  style={{ justifyContent: 'left' }}
                />
              </div>
              <br />
              <div>
                <PageTitle
                  title={'파트너 선호 챔피언'}
                  explain={'이 챔피언을 선택한 유저와 우선적으로 매칭됩니다'}
                  noMargin
                />
                <ImageViewGroup
                  icons={[
                    ...likes.map(select => {
                      return {
                        img: championSquareImage(select),
                        style: {
                          width: '48px'
                        }
                      };
                    }),
                    {
                      img: <AddIcon style={{ fontSize: '48px' }} />,
                      onClick: event => {
                        this.openChampions(likes, selections => {
                          this.setState({
                            ...this.state,
                            likes: selections
                          });
                        });
                      }
                    }
                  ]}
                  style={{ justifyContent: 'left' }}
                />
              </div>
              <br />
              <div>
                <PageTitle
                  title={'파트너 금지 챔피언'}
                  explain={'이 챔피언을 선택한 유저와는 매칭되지 않습니다'}
                  noMargin
                />
                <ImageViewGroup
                  icons={[
                    ...ban.map(select => {
                      return {
                        img: championSquareImage(select),
                        style: {
                          width: '48px'
                        }
                      };
                    }),
                    {
                      img: <AddIcon style={{ fontSize: '48px' }} />,
                      onClick: () => {
                        this.openChampions(ban, selections => {
                          this.setState({
                            ...this.state,
                            ban: selections
                          });
                        });
                      }
                    }
                  ]}
                  style={{ justifyContent: 'left' }}
                />
              </div>
            </Collapse>
            <br />
            <AlignLayout align={'right'}>
              <Button
                block
                color={'primary'}
                onClick={this.requestStart}
                size={'large'}
              >
                시작 &gt;
              </Button>
            </AlignLayout>
          </div>
        </Section>
        <br />
      </div>
    );
  }
}

export default quickConnect(Ready);
