import {standardActionTypes, apiExecutionState} from '../actions/actionTypes';

const initialState = {
  id: '',
  code: '',
  name: '',
  fees: '',
  standardLookUp: {},
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
    case standardActionTypes.API_GET_ALL_STANDARDS_LOOKUP + apiExecutionState.FINISHED:
      const standardLookUp = JSON.parse(action.response);
      return {
        ...state,
        standardLookUp
      };
    case standardActionTypes.API_CREATE_STANDARD + apiExecutionState.FINISHED:
      const createdStandard = JSON.parse(action.response);
      state.standardList.push(createdStandard);
      return {
        ...state,
      };
    case standardActionTypes.API_UPDATE_STANDARD + apiExecutionState.FINISHED:
      const standardToUpdate = action.payload;
      const standardIdToUpdate = action.payload.id;
      for (let index = 0; index < state.standardList.length; index++) {
        if (standardIdToUpdate === state.standardList[index].id) {
          state.standardList[index] = standardToUpdate;
        }
      }
      return {
        ...state,
      };
    case standardActionTypes.API_DELETE_STANDARD + apiExecutionState.FINISHED:
      const standardIdToDelete = action.payload;
      for (let index = 0; index < state.standardList.length; index++) {
        if (standardIdToDelete === state.standardList[index].id) {
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
