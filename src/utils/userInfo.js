
export function setUser(userName, password) {
  window.localStorage.setItem('testEngineUser', userName + ':' + password);
  window.localStorage.setItem('userName', userName);
}

export function setAdmin(admin) {
  window.localStorage.setItem('admin', admin);
}

export function getAdmin() {
  return !!JSON.parse(window.localStorage.getItem('admin'));
}

export function clearUserInfo() {
  window.localStorage.removeItem('testEngineUser');
  window.localStorage.removeItem('userName');
  window.localStorage.removeItem('admin');
}

export function getUserName() {
  return window.localStorage.getItem('userName');
}

export function getTestServerUser() {
  return window.localStorage.getItem('testEngineUser');
}

export function setLoggeddIn() {
  window.localStorage.setItem('loggedInToTestEngine', true);
}

export function isUserLoggedIn() {
  return !!JSON.parse(window.localStorage.getItem('loggedInToTestEngine'));
}

export function setLoggedOut() {
  window.localStorage.removeItem('loggedInToTestEngine');
}
