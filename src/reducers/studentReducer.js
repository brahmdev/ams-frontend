import { studentAdmissionActionTypes, apiExecutionState} from '../actions/actionTypes';

const initialState = {
  id: '',
  rollNo: '',
  standardLookUp: {},
  batchLookUp: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case studentAdmissionActionTypes.API_GET_ALL_STANDARD_LOOKUP_FOR_STUDENT_ADMISSION + apiExecutionState.FINISHED:
      const standardLookUp = JSON.parse(action.response);
      return {
        ...state,
        standardLookUp
      };
    case studentAdmissionActionTypes.API_GET_BATCH_FOR_STUDENT_ADMISSION + apiExecutionState.FINISHED:
      const batchLookUp = JSON.parse(action.response);
      return {
        ...state,
        batchLookUp
      };
    case studentAdmissionActionTypes.API_GET_STANDARD + apiExecutionState.FINISHED:
      const standard = JSON.parse(action.response);
      return {
        ...state,
        standardLookUp
      };
    default:
      return state;
  }
}
