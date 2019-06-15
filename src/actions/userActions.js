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
    onSuccess: getAuthorities
  };
}

export function getAuthorities(user) {
  const username = JSON.parse(user).username;
  return {
    type: userActionTypes.API_GET_USER_AUTHORITIES,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/users/${username}/authorities`,
      options: {
        method: 'GET'
      }
    },
  };
}
