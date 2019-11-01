import React, { Component } from 'react';
import SquareButton from '../../components/SquareButton/SquareButton';
import { getPath } from '../../lib/url';
import Popcorn from '../../components/Popcorn/Popcorn';
import PageTitle from '../../components/PageTitle/PageTitle';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';

class GameList extends Component {
  state = {
    gameList: [
      {
        title: '리그 오브 레전드',
        img: null,
        onClick: () => {
          this.go(getPath(`/teambuild/lol`));
        }
      },
      {
        title: '오버워치',
        img: null,
        onClick: () => {
          this.go(getPath(`/teambuild/overwatch`));
        }
      },
      {
        title: '배틀그라운드',
        img: null,
        onClick: () => {
          this.go(getPath(`/teambuild/battleground`));
        }
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
            title={'팀 매칭이 필요한 게임을 선택하세요'}
            explain={'선택하세요'}
            centering
          />
        </AlignLayout>
        <Popcorn>
          {gameList.map(game => {
            return (
              <div>
                <SquareButton
                  onClick={game.onClick}
                  img={game.img}
                  minHeight={'100px'}
                >
                  {game.title}
                </SquareButton>
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
