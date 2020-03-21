import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Contents from './Contents';
import Content from './Read';
import lol from '../../resource/icon/lol.jpg';
import overwatch from '../../resource/icon/overwatch.png';
import battleground from '../../resource/icon/battleground.png';
import Write from './Write';
import { quickConnect } from '../../../redux/quick';
import getHistory from 'react-router-global-history';
import Update from './Update';

class Community extends Component {
  componentDidMount() {
    this.props.SideNavDispatcher.set({
      일반: [
        {
          label: '자유게시판',
          onClick: () => {
            this.go(`/community?category=general`);
          }
        },
        {
          label: '익명게시판',
          onClick: () => {
            this.go(`/community?category=anonymous`);
          }
        },
        {
          label: '화장실',
          onClick: () => {
            this.go(`/trash`);
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
          label: '사이퍼즈',
          icon: lol,
          onClick: () => {
            this.go(`/community?category=cyphers`);
          }
        },
        {
          label: '오버워치',
          icon: overwatch,
          onClick: () => {
            this.go(`/community?category=overwatch`);
          }
        },
        {
          label: '배틀그라운드',
          icon: battleground,
          onClick: () => {
            this.go(`/community?category=pubg`);
          }
        }
      ]
    });
  }

  go = path => {
    getHistory().push(path);
  };

  componentWillUnmount() {
    this.props.SideNavDispatcher.remove();
  }

  render() {
    return (
      <div>
        <div>
          <Route exact path={`/community/write`} component={Write} />
          <Route exact path={`/community`} component={Contents} />
          <Route exact path={`/community/read/:id`} component={Content} />
          <Route exact path={`/community/update/:id`} component={Update} />
        </div>
      </div>
    );
  }
}

export default quickConnect(Community);
