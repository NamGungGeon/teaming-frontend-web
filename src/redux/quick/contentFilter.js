import { handleActions, createAction } from 'redux-actions';
import { randStr } from '../../utils/utils';

const filters = (() => {
  const getFilter = key => {
    const data = window.localStorage.getItem(key);
    if (!data) return [];
    else return JSON.parse(data);
  };
  return {
    board: getFilter('board'),
    boardComment: getFilter('boardComment'),
    trash: getFilter('trash'),
    trashComment: getFilter('trashComment')
  };
})();
const saveFilter = (key, arr) => {
  window.localStorage.setItem(key, JSON.stringify(arr));
};

const HIDE_BOARD = randStr(30);
const HIDE_BOARDCOMMENT = randStr(30);
const HIDE_TRASH = randStr(30);
const HIDE_TRASHCOMMENT = randStr(30);

export const hideBoard = createAction(HIDE_BOARD);
export const hideBoardComment = createAction(HIDE_BOARDCOMMENT);
export const hideTrash = createAction(HIDE_TRASH);
export const hideTrashComment = createAction(HIDE_TRASHCOMMENT);

export default handleActions(
  {
    [HIDE_BOARD]: (beforeState, action) => {
      const { board } = beforeState;
      board.push(action.payload);
      saveFilter('board', board);
      return {
        ...beforeState,
        board
      };
    },

    [HIDE_BOARDCOMMENT]: (beforeState, action) => {
      const { boardComment } = beforeState;
      boardComment.push(action.payload);
      saveFilter('boardComment', boardComment);
      return {
        ...beforeState,
        boardComment
      };
    },

    [HIDE_TRASH]: (beforeState, action) => {
      const { trash } = beforeState;
      trash.push(action.payload);
      saveFilter('trash', trash);
      return {
        ...beforeState,
        trash
      };
    },

    [HIDE_TRASHCOMMENT]: (beforeState, action) => {
      const { trashComment } = beforeState;
      trashComment.push(action.payload);
      saveFilter('trashComment', trashComment);
      return {
        ...beforeState,
        trashComment
      };
    }
  },
  filters
);
