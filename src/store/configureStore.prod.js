import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers';
import httpApi from '../middlewares/api';
import socketApi from '../middlewares/socket';

export const store = createStore(rootReducer, applyMiddleware(httpApi, socketApi));
