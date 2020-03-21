import React, { Component } from 'react';
import lol from '../../resource/icon/lol.jpg';
import overwatch from '../../resource/icon/overwatch.png';
import battleground from '../../resource/icon/battleground.png';
import Window from '../../primitive/Window/Window';
import HorizontalNavigation from '../Navigation/HorizontalNavigation';

class CommunityCategory extends Component {
  state = {
    nav: {
      일반: [
        {
          label: '통합게시판',
          onClick: () => {
            this.go(`/community`);
          }
        },
        {
          label: '자유게시판',
          onClick: () => {
            this.go(`/community?category=free`);
          }
        },
        {
          label: '익명게시판',
          onClick: () => {
            this.go(`/community?category=anonymous`);
          }
        }
      ],
      게임: [
        {
          label: '리그 오브 레전드',
          icon: lol,
          onClick: () => {
            this.go(`/community?category=lol`);
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
    }
  };

  go = path => {
    this.props.history.push(path);
  };

  render() {
    return (
      <Window title={'메뉴'} foldable>
        <HorizontalNavigation nav={this.state.nav} />
      </Window>
    );
  }
}

export default CommunityCategory;
