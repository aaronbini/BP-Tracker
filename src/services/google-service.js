userService.$inject = ['tokenService', '$http', 'apiUrl'];

export default function userService (tokenService, $http, apiUrl) {
  const current = tokenService.getCurrent();

  if (current.token) {
    $http.get(`${apiUrl}/auth/verify`)
      .catch(() => {
        tokenService.remove();
      });
  }

  function oAuth () {
    return $http.get(`${apiUrl}/oauth/googleAuth`);
  };

  return {
    oAuth,

  };

}
