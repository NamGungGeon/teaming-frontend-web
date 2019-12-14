import React, { Component } from 'react';
import Section from '../../../primitive/Section/Section';
import PageTitle from '../../../primitive/PageTitle/PageTitle';


import plus from '../../../resource/plus.png';

import ImageSelect from '../../../primitive/ImageSelect/ImageSelect';
import ImageViewGroup from '../../../containers/ImageViewGroup/ImageViewGroup';
import AlignLayout from '../../../layouts/AlignLayout/AlignLayout';
import { quickConnect } from '../../../redux';
import ChampionSelect from '../../../containers/ChampionSelect/ChampionSelect';
import {getPath, resPath} from '../../../utils/url';
import {Button} from "reactstrap";
import Input from "reactstrap/es/Input";
import Collapse from "reactstrap/es/Collapse";
import ButtonGroup from "reactstrap/es/ButtonGroup";

const lines= [
  { img: `${resPath}/lol/line/top.png`, id: 'top', label: '탑', height: '48px' },
  { img: `${resPath}/lol/line/md.png`, id: 'mid', label: '미드', height: '48px' },
  { img: `${resPath}/lol/line/ad.png`, id: 'bottom', label: '바텀', height: '48px' },
  { img: `${resPath}/lol/line/jg.png`, id: 'jungle', label: '정글', height: '48px' },
  { img: `${resPath}/lol/line/sp.png`, id: 'supporter', label: '서포터', height: '48px' },
  { img: `${resPath}/lol/line/all.png`, id: 'all', label: '상관없음', height: '48px' },
];
const tiers= [
  { img: `${resPath}/lol/tier/bronze.png`, id: 'bronze', label: '브론즈' , height: '48px'},
  { img: `${resPath}/lol/tier/silver.png`, id: 'silver', label: '실버', height: '48px' },
  { img: `${resPath}/lol/tier/gold.png`, id: 'gold', label: '골드', height: '48px' },
  { img: `${resPath}/lol/tier/platinum.png`, id: 'platinum', label: '플래티넘', height: '48px' },
  { img: `${resPath}/lol/tier/diamond.png`, id: 'diamond', label: '다이아몬드', height: '48px'},
  { img: `${resPath}/lol/tier/master.png`, id: 'master', label: '마스터', height: '48px' },
  { img: `${resPath}/lol/tier/grandmaster.png`, id: 'grandmaster', label: '그랜드마스터', height: '48px' },
  { img: `${resPath}/lol/tier/challenger.png`, id: 'challenger', label: '챌린저', height: '48px' },
]

class Option extends Component {
  state = {
    gameType: 'rank',
    tier: '',
    champions: [],
    ban: [],
    likes: [],
    mainPos: '',
    subPos: '',
    nickname: '',
    isRank: true,
    mode: 'rank',
    goal: 'win',
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
    // if (!tier) {
    //   uiKit.toaster.cooking('티어를 선택하세요');
    //   return;
    // }
    // if (champions.length === 0) {
    //   uiKit.toaster.cooking('챔피언을 하나 이상 선택하세요');
    //   return;
    // }
    // if (!mainPos) {
    //   uiKit.toaster.cooking('메인 라인을 선택하세요');
    //   return;
    // }
    // if (!subPos) {
    //   uiKit.toaster.cooking('서브 라인을 선택하세요');
    //   return;
    // }

    history.push(getPath(`/teambuild/lol/start`));
  };

  render() {
    const {mode, goal}= this.state;

    return (
      <div>
        <PageTitle
          title={'팀 매칭 사전준비'}
          explain={'리그 오브 레전드 팀 매칭을 위한 사전 정보 입력'}
          align={'center'}
        />
        <Section>
          <div style={{
            textAlign: 'left',
          }}>
            <div>
              <div style={{display: 'inline-block', maxWidth: '350px', width: '100%'}}>
                <PageTitle title={'닉네임'} explain={''} noMargin />
                <Input
                  className={'transparent'}
                  width={'400px'}
                  type='text'
                  placeholder='게임 내에서 사용중인 닉네임을 입력하세요'
                  onChange={e => {
                    this.setState({ ...this.state, nickname: e.target.value });
                  }}/>
              </div>
            </div>
            <div>
              <PageTitle title={'목표'} noMargin/>
              <ButtonGroup>
                <Button color={'danger'} outline={goal!== 'win'}
                        onClick={()=>{
                          this.setState({
                            ...this.state,
                            goal: 'win',
                          })
                        }}>
                  빡겜
                </Button>
                <Button color={'primary'} outline={goal!== 'fun'}
                        onClick={()=>{
                          this.setState({
                            ...this.state,
                            goal: 'fun',
                          })
                        }}>
                  즐겜
                </Button>
              </ButtonGroup>
            </div>
            <div>
              <PageTitle title={'게임 모드'} noMargin/>
              <ButtonGroup>
                <Button
                  color={'primary'}
                  outline={mode!=='rank'}
                  onClick={()=>{
                    this.setState({
                      ...this.state,
                      mode: 'rank',
                    })
                  }}>
                  랭크
                </Button>
                <Button
                  color={'primary'}
                  outline={mode!=='freerank'}
                  onClick={()=>{
                    this.setState({
                      ...this.state,
                      mode: 'freerank',
                    })
                  }}>
                  자유 랭크
                </Button>
                <Button
                  color={'primary'}
                  outline={mode!=='normal'}
                  onClick={()=>{
                    this.setState({
                      ...this.state,
                      mode: 'normal',
                    })
                  }}>
                  일반
                </Button>
                <Button
                  color={'primary'}
                  outline={mode!=='chess'}
                  onClick={()=>{
                    this.setState({
                      ...this.state,
                      mode: 'chess',
                    })
                  }}>
                  전략적 팀 전투
                </Button>
              </ButtonGroup>
            </div>
            <div>
              <Collapse isOpen={mode!=='normal'}>
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
              </Collapse>
            </div>
            <Collapse isOpen={mode!== 'chess'}>
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
              <br/>
              <div>
                <PageTitle title={'서브 라인'} explain={''} noMargin />
                <ImageSelect
                  icons={lines}
                  style={{ justifyContent: 'left' }}
                  selections={selection => {
                    this.setState({ ...this.state, subPos: selection });
                  }}
                />
              </div>
              <br/>
              <div>
                <PageTitle title={'파트너 라인'} explain={''} noMargin />
                <ImageSelect
                  icons={lines}
                  style={{ justifyContent: 'left' }}
                  selections={selection => {
                    this.setState({ ...this.state, subPos: selection });
                  }}
                />
              </div>
              <br/>
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
                        img: `${resPath}/lol/champions/${select}.png`
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
              <br/>
              <div>
                <PageTitle
                  title={'파트너 선호 챔피언'}
                  explain={'이 챔피언을 선택한 유저와 우선적으로 매칭됩니다'}
                  noMargin
                />
                <ImageViewGroup
                  icons={[
                    ...this.state.likes.map(select => {
                      return {
                        img: `${resPath}/lol/champions/${select}.png`
                      };
                    }),
                    {
                      img: plus,
                      label: '',
                      onClick: () => {
                        this.openChampions(this.state.likes, selections => {
                          this.setState({
                            ...this.state,
                            likes: selections
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
              <br/>
              <div>
                <PageTitle
                  title={'파트너 금지 챔피언'}
                  explain={'이 챔피언을 선택한 유저와는 매칭되지 않습니다'}
                  noMargin
                />
                <ImageViewGroup
                  icons={[
                    ...this.state.ban.map(select => {
                      return {
                        img: `${resPath}/lol/champions/${select}.png`
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
            </Collapse>

            <AlignLayout align={'right'}>
              <Button
                color={'primary'}
                onClick={this.requestStart}
                size={'large'}>시작 &gt;</Button>
            </AlignLayout>
          </div>
        </Section>
        <br />
      </div>
    );
  }
}

export default quickConnect(Option);
