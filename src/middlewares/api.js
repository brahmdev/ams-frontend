import { CALL_API } from '../actions/actionTypes';
import { getAMSUser} from '../utils/userInfo';
import { actionWith } from '../utils/index';
import { apiExecutionState } from "../actions/actionTypes";
import {
  executeNextFailureHandlers,
  executeNextSuccessHandlers,
  notifyReducersWithFailure,
  notifyReducersWithSuccess
} from '../utils/middlewareHelper';

export default (store) => (next) => (action) => {
  if (!action) {
    return;
  }
  if (action.apiType !== CALL_API) {
    return next(action);
  }

  next(
    actionWith(action, {
      type: action.type + apiExecutionState.STARTED
    })
  );

  makeRequest(store, action, next).catch((error) => {
    notifyReducersWithFailure(action, next, error);
    executeNextFailureHandlers(action, store, error);
  });
};

async function makeRequest(store, action, next) {
  const response = await fetch(constructRequest(action));

  response.text = await response.text();
  if (response.ok) {
    notifyReducersWithSuccess(action, next, response.text);
    executeNextSuccessHandlers(action, store, response.text);
  } else {
    notifyReducersWithSuccess(action, next, response.text);
    executeNextSuccessHandlers(action, store, response.text);
  }
}

function constructRequest(action) {
  const TEST_SERVER_BASE_PATH = '/api/v1';
  const {
    callAPI: {apiPathWithParam, options}
  } = action;

  const url = TEST_SERVER_BASE_PATH + apiPathWithParam;
  const headers = new Headers();

  let authString;
  authString = getAMSUser();

  headers.append('Authorization', 'Basic ' + window.btoa(authString));
  if (options.contentType) {
    headers.append('content-type', options.contentType);
  }

  return new Request(url, {
    method: options.method,
    body: options.body,
    headers: headers
  });
}
