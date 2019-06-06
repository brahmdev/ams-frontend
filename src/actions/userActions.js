import { userActionTypes, CALL_API } from './actionTypes';

export function login(username) {
  return {
    type: userActionTypes.API_USER_LOGIN,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/login/${username}`,
      options: {
        method: 'GET'
      }
    },
  };
}
