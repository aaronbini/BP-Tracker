tokenService.$inject = ['$window'];

const TOKEN = 'token';
const USER_NAME = 'username';
const ID = 'userId';

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
    }
  };
};
