import { subjectActionTypes, apiExecutionState} from '../actions/actionTypes';

const initialState = {
  id: '',
  code: '',
  name: '',
  subjectList: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case subjectActionTypes.API_GET_ALL_SUBJECTS + apiExecutionState.FINISHED:
      const subjectList = JSON.parse(action.response);
      return {
        ...state,
        subjectList
      };
    case subjectActionTypes.API_CREATE_SUBJECT + apiExecutionState.FINISHED:
      const createdBoard = JSON.parse(action.response);
      state.subjectList.push(createdBoard);
      return {
        ...state,
      };
    case subjectActionTypes.API_UPDATE_SUBJECT + apiExecutionState.FINISHED:
      const boardToUpdate = action.payload;
      const boardIdToUpdate = action.payload.id;
      for (let index = 0; index < state.subjectList.length; index++) {
        if (boardIdToUpdate === state.subjectList[index].id) {
          state.subjectList[index] = boardToUpdate;
        }
      }
      return {
        ...state,
      };
    case subjectActionTypes.API_DELETE_SUBJECT + apiExecutionState.FINISHED:
      const boardIdToDelete = action.payload;
      for (let index = 0; index < state.subjectList.length; index++) {
        if (boardIdToDelete === state.subjectList[index].id) {
          state.subjectList.splice(index, 1);
        }
      }
      return {
        ...state,
      };

    default:
      return state;
  }
}
