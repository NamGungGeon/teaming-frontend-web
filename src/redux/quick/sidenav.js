import { handleActions, createAction } from 'redux-actions';
import { randStr } from '../../utils/utils';
import GamepadIcon from '@material-ui/icons/Gamepad';
import PeopleIcon from '@material-ui/icons/People';
import ChatIcon from '@material-ui/icons/Chat';
import QueueIcon from '@material-ui/icons/Queue';
import { FaToiletPaper } from 'react-icons/fa';
import { MdBusinessCenter } from 'react-icons/md';
import React from 'react';
import getHistory from 'react-router-global-history';

const sideNav = {
  nav: {
    메뉴: [
      {
        label: (
          <span>
            <GamepadIcon />
            &nbsp;&nbsp;팀매칭
          </span>
        ),
        onClick: () => {
          getHistory().push(`/match`);
        }
      },
      {
        label: (
          <span>
            <PeopleIcon />
            &nbsp;&nbsp;커뮤니티
          </span>
        ),
        onClick: () => {
          getHistory().push(`/community`);
        }
      },
      {
        label: (
          <span>
            <FaToiletPaper style={{ fontSize: '24px' }} />
            &nbsp;&nbsp;화장실
          </span>
        ),
        onClick: () => {
          getHistory().push(`/trash`);
        }
      },
      {
        label: (
          <span>
            <ChatIcon />
            &nbsp;&nbsp;랜덤채팅
          </span>
        ),
        onClick: () => {
          getHistory().push(`/chat`);
        }
      },
      {
        label: (
          <span>
            <QueueIcon />
            &nbsp;&nbsp;채팅방
          </span>
        ),
        onClick: () => {
          alert('개발중인 기능입니다');
          // getHistory().push('/rooms');
        }
      },
      {
        label: (
          <span>
            <MdBusinessCenter style={{ fontSize: '24px' }} />
            &nbsp;&nbsp;고객센터
          </span>
        ),
        onClick: () => {
          getHistory().push(`/center`);
        }
      }
    ]
  },
  visible: false
};

const SET = randStr(30);
const REMOVE = randStr(30);
const TOGGLE = randStr(30);

export const set = createAction(SET);
export const remove = createAction(REMOVE);
export const toggle = createAction(TOGGLE);

export default handleActions(
  {
    [SET]: (beforeState, action) => {
      return {
        ...beforeState,
        nav: action.payload,
        visible: false
      };
    },
    [REMOVE]: () => {
      return sideNav;
    },
    [TOGGLE]: beforeState => {
      return {
        ...beforeState,
        visible: !beforeState.visible
      };
    }
  },
  sideNav
);
