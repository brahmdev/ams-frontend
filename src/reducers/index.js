import { combineReducers } from 'redux';
import UserLoginReducer from './userReducer';

const appReducer = combineReducers({
    user: UserLoginReducer,
});

export const rootReducer = (state, action) => {
    return appReducer(state, action);
};
