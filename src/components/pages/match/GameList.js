import React, { Component } from 'react';
import SquareButton from '../../primitive/SquareButton/SquareButton';
import { getPath } from '../../../utils/url';
import PageTitle from '../../primitive/PageTitle/PageTitle';

import lol from '../../resource/icon/lol.jpg';
import cyphers from '../../resource/icon/cyphers.png';
import battleground from '../../resource/icon/battleground.png';
import { randStr } from '../../../utils/utils';

import ButtonsWrapper from '../../primitive/ButtonsWrapper/ButtonsWrapper';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';
import { TextField } from '@material-ui/core';
import { quickConnect } from '../../../redux/quick';

class GameList extends Component {
  state = {
    gameList: [],
    filter: ''
  };

  componentDidMount() {
    const { config } = this.props;
    if (config.imapp) {
      this.setState({
        ...this.state,
        gameList: [
          {
            label: '리그 오브 레전드',
            icon: lol,
            onClick: () => {
              this.go(getPath(`/match/lol`));
            }
          }
        ]
      });
    } else {
      this.setState({
        ...this.state,
        gameList: [
          {
            label: '리그 오브 레전드',
            icon: lol,
            onClick: () => {
              this.go(getPath(`/match/lol`));
            }
          },
          {
            label: '배틀그라운드',
            icon: battleground,
            onClick: () => {
              this.go(getPath(`/match/battleground`));
            }
          },
          {
            label: '사이퍼즈',
            icon: cyphers,
            onClick: () => {
              this.go(getPath(`/match/cyphers`));
            }
          }
        ]
      });
    }
    window.scrollTo(0, 0);
  }

  go = path => {
    this.props.history.push(path);
  };

  render() {
    const { gameList, filter } = this.state;
    return (
      <div>
        <PageTitle
          title={'팀 매칭'}
          explain={'팀 매칭이 필요한 게임을 선택하세요'}
          align={'left'}
        />
        <AlignLayout align={'right'}>
          <TextField
            onChange={e => {
              this.setState({
                ...this.state,
                filter: e.target.value
              });
            }}
            size={'small'}
            variant={'outlined'}
            style={{
              width: '256px'
            }}
            placeholder={'게임 검색'}
            type={'text'}
          />
        </AlignLayout>

        <br />

        <ButtonsWrapper>
          {gameList.map(game => {
            if (filter !== '' && !game.label.includes(filter)) return '';

            return <SquareButton key={randStr(10)} {...game} />;
          })}
        </ButtonsWrapper>
      </div>
    );
  }
}

export default quickConnect(GameList);
