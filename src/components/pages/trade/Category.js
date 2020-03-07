import React, { Component } from 'react';
import SquareButton from '../../primitive/SquareButton/SquareButton';
import { getPath } from '../../../utils/url';
import PageTitle from '../../primitive/PageTitle/PageTitle';
import { randStr } from '../../../utils/utils';
import CardWrapper from '../../primitive/CardWrapper/CardWrapper';
import { TextField } from '@material-ui/core';

class Category extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

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
      }
    ],
    filter: ''
  };

  go = path => {
    this.props.history.push(path);
  };
  render() {
    const { gameList, filter } = this.state;
    return (
      <div>
        <PageTitle
          title={'거래소'}
          explain={'아이템을 거래할 게임을 선택하세요'}
          align={'left'}
        />
        <TextField
          fullWidth
          type={'text'}
          onChange={e => {
            this.setState({
              ...this.state,
              filter: e.target.value
            });
          }}
          placeholder="게임 검색"
        />

        <br />
        <br />
        <CardWrapper>
          {gameList.map((game, idx) => {
            if (filter !== '' && !game.label.includes(filter)) return '';
            return (
              <div key={randStr(5)}>
                <SquareButton
                  style={{
                    animationDelay: `${0.1 * idx}s`
                  }}
                  enableAnimation
                  {...game}
                />
                <br />
              </div>
            );
          })}
        </CardWrapper>
      </div>
    );
  }
}

export default Category;
