tokenService.$inject = ['$window'];

const TOKEN = 'token';
const USER_NAME = 'username';
const ID = 'userId';
const GOOGLE = 'google';
const VERIFY = 'google_verify';
const REFRESH = 'refresh_token';

export default function tokenService ($window) {
  return {
    getCurrent () {
      return {
        token: $window.localStorage.getItem(TOKEN),
        username: $window.localStorage.getItem(USER_NAME),
        id: $window.localStorage.getItem(ID)
      };
    },
    get () {
      return $window.localStorage.getItem(TOKEN);
    },
    getUserId () {
      return $window.localStorage.getItem(ID);
    },
    getUsername () {
      return $window.localStorage.getItem(USER_NAME);
    },
    remove () {
      $window.localStorage.removeItem(USER_NAME);
      $window.localStorage.removeItem(ID);
      $window.localStorage.removeItem(TOKEN);
    },
    set (payload) {
      $window.localStorage.setItem(TOKEN, payload.token);
      $window.localStorage.setItem(ID, payload.id);
      $window.localStorage.setItem(USER_NAME, payload.username);
    },
    setRefresh (refresh) {
      $window.localStorage.setItem(REFRESH, refresh);
    },
    setGoogle (payload) {
      $window.localStorage.setItem(GOOGLE, payload.access_token);
      $window.localStorage.setItem(VERIFY, payload.id_token);
    },
    getGoogle () {
      return $window.localStorage.getItem(GOOGLE);
    },
    getRefresh () {
      return $window.localStorage.getItem(REFRESH);
    },
    removeGoogle () {
      $window.localStorage.removeItem(GOOGLE);
      $window.localStorage.removeItem(VERIFY);
    }
  };
};
