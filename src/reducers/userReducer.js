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
  branch: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userActionTypes.API_USER_LOGIN + apiExecutionState.FINISHED:
      const user = JSON.parse(action.response);
      console.log('user: ', user);

      const instituteId = user.branch.institute.id;
      setInstituteId(instituteId);

      const branchId = user.branch.id;
      setBranchId(branchId);

      const authorities = user.authoritieses;
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
        userName: user.userName,
        admin: isAdmin,
        isLoading: false,
        isLoggedIn: true,
        loginError: false,
        institute: user.branch.institute,
        branch: user.branch
      };
    default:
      return state;
  }
}
