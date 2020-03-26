import React, { Component, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import Contents from './Contents';
import Read from './Read';

import lol from '../../resource/icon/lol.jpg';
import overwatch from '../../resource/icon/overwatch.png';
import battleground from '../../resource/icon/battleground.png';
import { quickConnect } from '../../../redux/quick';

const Write = React.lazy(() => import('./Write'));
const Update = React.lazy(() => import('./Update'));
const Trash = React.lazy(() => import('./Trash'));

const Community = ({ history, SideNavDispatcher }) => {
  useEffect(() => {
    SideNavDispatcher.set({
      일반: [
        {
          label: '자유게시판',
          onClick: () => {
            history.push(`/community?category=general`);
          }
        },
        {
          label: '익명게시판',
          onClick: () => {
            history.push(`/community?category=anonymous`);
          }
        },
        {
          label: '화장실',
          onClick: () => {
            history.push(`/community/trash`);
          }
        }
      ],
      게임: [
        {
          label: '리그 오브 레전드',
          icon: lol,
          onClick: () => {
            history.push(`/community?category=lol`);
          }
        },
        {
          label: '사이퍼즈',
          icon: lol,
          onClick: () => {
            history.push(`/community?category=cyphers`);
          }
        },
        {
          label: '오버워치',
          icon: overwatch,
          onClick: () => {
            history.push(`/community?category=overwatch`);
          }
        },
        {
          label: '배틀그라운드',
          icon: battleground,
          onClick: () => {
            history.push(`/community?category=pubg`);
          }
        }
      ]
    });
    return SideNavDispatcher.remove;
  }, []);

  return (
    <Switch>
      <Route exact path={`/community/trash`} component={Trash} />
      <Route exact path={`/community`} component={Contents} />
      <Route exact path={`/community/write`} component={Write} />
      <Route exact path={`/community/read/:id`} component={Read} />
      <Route exact path={`/community/update/:id`} component={Update} />
    </Switch>
  );
};

export default quickConnect(Community);
