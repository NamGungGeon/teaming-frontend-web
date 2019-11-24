import React, { Component } from 'react';
import SquareButton from '../../primitive/SquareButton/SquareButton';
import { getPath } from '../../utils/url';
import Popcorn from '../../primitive/Popcorn/Popcorn';
import PageTitle from '../../primitive/PageTitle/PageTitle';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';

import lol from '../../resource/icon/lol.jpg';
import overwatch from '../../resource/icon/overwatch.png';
import battleground from '../../resource/icon/battleground.png';
import {randStr} from "../../utils/utils";

class GameList extends Component {
  state = {
    gameList: [
      {
        label: '리그 오브 레전드',
        icon: lol,
        onClick: () => {
          this.go(getPath(`/teambuild/lol`));
        }
      },
      {
        label: '오버워치',
        icon: overwatch
      },
      {
        label: '배틀그라운드',
        icon: battleground
      }
    ]
  };

  go = path => {
    this.props.history.push(path);
  };
  render() {
    const { gameList } = this.state;
    return (
      <div>
        <AlignLayout align={'center'}>
          <PageTitle
            title={'팀 매칭'}
            explain={'팀 매칭이 필요한 게임을 선택하세요'}
            align={'center'}
          />
        </AlignLayout>
        <Popcorn>
          {gameList.map(game => {
            return (
              <div key={randStr(5)}>
                <SquareButton
                  {...game}
                />
                <br />
              </div>
            );
          })}
        </Popcorn>
      </div>
    );
  }
}

export default GameList;
