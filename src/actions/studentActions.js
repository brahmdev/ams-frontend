import {subjectActionTypes, studentAdmissionActionTypes, CALL_API} from './actionTypes';

export function getAllStudents(instituteId) {
  return {
    type: subjectActionTypes.API_GET_ALL_SUBJECTS,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/student/${instituteId}`,
      options: {
        method: 'GET'
      }
    },
  };
}

export function getAllStandardLookUpForStudent(instituteId) {
  return {
    type: studentAdmissionActionTypes.API_GET_ALL_STANDARD_LOOKUP_FOR_STUDENT_ADMISSION,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/standards/${instituteId}/lookup`,
      options: {
        method: 'GET'
      }
    },
  };
}

export function getAllBatchOfStandardLookUp(standardId) {
  return {
    type: studentAdmissionActionTypes.API_GET_BATCH_FOR_STUDENT_ADMISSION,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/batches/standard/${standardId}/lookup`,
      options: {
        method: 'GET'
      }
    },
  };
}

export function createUser(user) {
  return {
    type: subjectActionTypes.API_CREATE_SUBJECT,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/users/`,
      options: {
        method: 'POST',
        contentType: 'application/json',
        body: JSON.stringify(user)
      }
    },
    payload: { user }
  };
}

export function updateStudent(user) {
  return {
    type: subjectActionTypes.API_UPDATE_SUBJECT,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/student/`,
      options: {
        method: 'POST',
        contentType: 'application/json',
        body: JSON.stringify(user)
      },
    },
    payload: user
  };
}

export function deleteStudent(subjectId) {
  return {
    type: subjectActionTypes.API_DELETE_SUBJECT,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/student/${subjectId}`,
      options: {
        method: 'DELETE',
        contentType: 'application/json'
      },
    },
    payload: subjectId
  };
}