// @flow
import { userActionTypes, CALL_API } from './actionTypes';

export function login(username) {
  return {
    //trying to load data from the backend for the first time - to check if credentials provided by the user are valid
    type: userActionTypes.API_USER_LOGIN,
    payload: {
        username: username,
        admin: true
    }
    /*apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/users/${username}`,
      options: {
        method: 'GET'
      }
    },*/
  };
}
