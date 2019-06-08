import {subjectActionTypes, apiExecutionState} from '../actions/actionTypes';

const initialState = {
  id: '',
  code: '',
  name: '',
  subjectLookUp: {},
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
    case subjectActionTypes.API_GET_ALL_SUBJECTS_LOOKUP + apiExecutionState.FINISHED:
      const subjectLookUp = JSON.parse(action.response);
      return {
        ...state,
        subjectLookUp
      };
    case subjectActionTypes.API_CREATE_SUBJECT + apiExecutionState.FINISHED:
      const createdBoard = JSON.parse(action.response);
      state.subjectList.push(createdBoard);
      return {
        ...state,
      };
    case subjectActionTypes.API_UPDATE_SUBJECT + apiExecutionState.FINISHED:
      const subjectToUpdate = action.payload;
      const subjectIdToUpdate = action.payload.id;
      for (let index = 0; index < state.subjectList.length; index++) {
        if (subjectIdToUpdate === state.subjectList[index].id) {
          state.subjectList[index] = subjectToUpdate;
        }
      }
      return {
        ...state,
      };
    case subjectActionTypes.API_DELETE_SUBJECT + apiExecutionState.FINISHED:
      const subjectIdToDelete = action.payload;
      for (let index = 0; index < state.subjectList.length; index++) {
        if (subjectIdToDelete === state.subjectList[index].id) {
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
