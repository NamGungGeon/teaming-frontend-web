import React, { Component } from 'react';
import SquareButton from '../../primitive/SquareButton/SquareButton';
import { getPath } from '../../utils/url';
import Popcorn from '../../primitive/Popcorn/Popcorn';
import PageTitle from '../../primitive/PageTitle/PageTitle';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';

import {randStr} from "../../utils/utils";

class Category extends Component {
  state = {
    gameList: [
      {
        label: '사이퍼즈',
        icon: require('../../resource/icon/cyphers.png'),
        onClick: () => {
          this.go(getPath(`/trade/cyphers`));
        }
      },
      {
        label: '메이플스토리',
        icon: require('../../resource/icon/maplestory.png'),
        onClick: () => {
          this.go(getPath(`/trade/maple`));
        }
      },
      {
        label: '던전앤파이터',
        icon: require('../../resource/icon/dnf.png'),
        onClick: () => {
          this.go(getPath(`/trade/dnf`));
        }
      },
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
            title={'거래소'}
            explain={'아이템을 거래할 게임을 선택하세요'}
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

export default Category;
