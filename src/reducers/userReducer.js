import {
    isUserLoggedIn,
    setLoggeddIn,
    getAdmin,
    setAdmin,
    clearUserInfo,
    setLoggedOut
} from '../utils/userInfo';
import {userActionTypes} from '../actions/actionTypes';

const initialState = {
    userName: '',
    admin: getAdmin(),
    isLoading: false,
    isLoggedIn: isUserLoggedIn(),
    loginError: false,
    loginErrorMessage: '',
    isSocketConnected: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case userActionTypes.API_USER_LOGIN:
            const currentUser = action.payload;
            setLoggeddIn();
            setAdmin(currentUser.admin);
            return {
                ...state,
                userName: currentUser.userName,
                admin: currentUser.admin,
                isLoading: false,
                isLoggedIn: true,
                loginError: false
            }
        default:
            return state;
    }
}
