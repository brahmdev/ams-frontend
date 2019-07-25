import {
  isUserLoggedIn,
  setLoggeddIn,
  getAdmin,
  setAdmin,
  setInstituteId,
  setBranchId
} from '../utils/userInfo';
import {userActionTypes, apiExecutionState} from '../actions/actionTypes';

const initialState = {
  userName: '',
  admin: getAdmin(),
  isLoading: false,
  isLoggedIn: isUserLoggedIn(),
  loginError: false,
  loginErrorMessage: '',
  isSocketConnected: false,
  institute: '',
  branch: '',
  authorities: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userActionTypes.API_USER_LOGIN + apiExecutionState.STARTED:
      return {
        ...state
      };
    case userActionTypes.API_USER_LOGIN + apiExecutionState.FINISHED:
      const user = JSON.parse(action.response);
      console.log('user: ', user);

      const instituteId = user.branch.institute.id;
      setInstituteId(instituteId);

      const branchId = user.branch.id;
      setBranchId(branchId);

      setLoggeddIn();
      return {
        ...state,
        userName: user.userName,
        admin: false,
        isLoading: false,
        isLoggedIn: true,
        loginError: false,
        institute: user.branch.institute,
        branch: user.branch
      };
    case userActionTypes.API_GET_USER_AUTHORITIES + apiExecutionState.FINISHED:
      const authorities = JSON.parse(action.response);
      console.log('authorities: ', authorities);

      let isAdmin = false;

      for (const authObj of authorities) {
        if (authObj.authority === 'ROLE_ADMIN') {
          isAdmin = true;
          setAdmin(true);
        }
      }
      setLoggeddIn();
      return {
        ...state,
        admin: isAdmin,
        isLoading: false,
        loginError: false,
        authorities
      };
    case userActionTypes.API_USER_LOGIN + apiExecutionState.ERROR:
    case userActionTypes.API_GET_USER_AUTHORITIES + apiExecutionState.ERROR:
      localStorage.clear();
      return {
        ...state,
        loginError: true,
        isUserLoggedIn: false
      };
    default:
      return state;
  }
}
