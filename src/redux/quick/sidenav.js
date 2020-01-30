import { handleActions, createAction } from 'redux-actions';
import { randStr } from '../../utils/utils';
import GamepadIcon from '@material-ui/icons/Gamepad';
import PeopleIcon from '@material-ui/icons/People';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import ChatIcon from '@material-ui/icons/Chat';
import { IoIosHeart } from 'react-icons/io';
import { FaToiletPaper } from 'react-icons/fa';
import { MdBusinessCenter } from 'react-icons/md';
import { getPath } from '../../utils/url';
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
          getHistory().push(getPath(`/match`));
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
          getHistory().push(getPath(`/community`));
        }
      },
      {
        label: (
          <span>
            <SwapHorizIcon />
            &nbsp;&nbsp;거래소
          </span>
        )
      },
      {
        label: (
          <span>
            <FaToiletPaper style={{ fontSize: '24px' }} />
            &nbsp;&nbsp;화장실
          </span>
        ),
        onClick: () => {
          getHistory().push(getPath(`/trash`));
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
          getHistory().push(getPath(`/chat`));
        }
      },
      {
        label: (
          <span>
            <IoIosHeart style={{ fontSize: '24px' }} />
            &nbsp;&nbsp;커플매칭
          </span>
        )
      },
      {
        label: (
          <span>
            <MdBusinessCenter style={{ fontSize: '24px' }} />
            &nbsp;&nbsp;고객센터
          </span>
        ),
        onClick: () => {
          getHistory().push(getPath(`/center`));
        }
      }
    ],
    콜라보: [
      {
        label: '사이퍼즈 서포터',
        onClick: () => {
          getHistory().push(getPath('/cyphers'));
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
