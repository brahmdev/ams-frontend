import { boardActionTypes, CALL_API } from './actionTypes';

export function getAllBoards(instituteId) {
  return {
    type: boardActionTypes.API_GET_ALL_BOARDS,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/boards/${instituteId}`,
      options: {
        method: 'GET'
      }
    },
  };
}

export function createBoard(board) {
  return {
    type: boardActionTypes.API_CREATE_BOARD,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/boards/`,
      options: {
        method: 'POST',
        contentType: 'application/json',
        body: JSON.stringify(board)
      }
    },
    payload: { board }
  };
}

export function upadateBoard(board) {
  return {
    type: boardActionTypes.API_UPDATE_BOARD,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/boards/`,
      options: {
        method: 'POST',
        contentType: 'application/json',
        body: JSON.stringify(board)
      },
    },
    payload: board
  };
}

export function deleteBoard(instituteId, boardId) {
  return {
    type: boardActionTypes.API_DELETE_BOARD,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/boards/${instituteId}/${boardId}`,
      options: {
        method: 'DELETE',
        contentType: 'application/json'
      },
    },
    payload: boardId
  };
}