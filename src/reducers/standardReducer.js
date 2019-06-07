import { standardActionTypes, apiExecutionState} from '../actions/actionTypes';

const initialState = {
  id: '',
  code: '',
  name: '',
  fees: '',
  standardList: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case standardActionTypes.API_GET_ALL_STANDARDS + apiExecutionState.FINISHED:
      const standardList = JSON.parse(action.response);
      return {
        ...state,
        standardList
      };
    case standardActionTypes.API_CREATE_STANDARD + apiExecutionState.FINISHED:
      const createdBoard = JSON.parse(action.response);
      state.standardList.push(createdBoard);
      return {
        ...state,
      };
    case standardActionTypes.API_UPDATE_STANDARD + apiExecutionState.FINISHED:
      const boardToUpdate = action.payload;
      const boardIdToUpdate = action.payload.id;
      for (let index = 0; index < state.standardList.length; index++) {
        if (boardIdToUpdate === state.standardList[index].id) {
          state.standardList[index] = boardToUpdate;
        }
      }
      return {
        ...state,
      };
    case standardActionTypes.API_DELETE_STANDARD + apiExecutionState.FINISHED:
      const boardIdToDelete = action.payload;
      for (let index = 0; index < state.standardList.length; index++) {
        if (boardIdToDelete === state.standardList[index].id) {
          state.standardList.splice(index, 1);
        }
      }
      return {
        ...state,
      };

    default:
      return state;
  }
}
