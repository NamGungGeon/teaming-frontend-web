import { handleActions, createAction } from 'redux-actions';
import { randStr } from '../../utils/utils';
import GamepadIcon from '@material-ui/icons/Gamepad';
import PeopleIcon from '@material-ui/icons/People';
import ChatIcon from '@material-ui/icons/Chat';
import QueueIcon from '@material-ui/icons/Queue';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import EventIcon from '@material-ui/icons/Event';
import CheckIcon from '@material-ui/icons/Check';
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
            <ImportContactsIcon />
            &nbsp;&nbsp;매거진
          </span>
        ),
        onClick: () => {
          getHistory().push(`/magazine`);
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
          getHistory().push('/rooms');
        }
      },

      {
        label: (
          <span>
            <CheckIcon />
            &nbsp;&nbsp;공지사항
          </span>
        ),
        onClick: () => {
          getHistory().push(`/important/notices`);
        }
      },

      {
        label: (
          <span>
            <EventIcon />
            &nbsp;&nbsp;이벤트
          </span>
        ),
        onClick: () => {
          getHistory().push(`/important/events`);
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
