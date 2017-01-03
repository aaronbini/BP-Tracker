userService.$inject = ['tokenService', '$http', 'apiUrl'];

export default function userService (tokenService, $http, apiUrl) {

  function checkValid (googleToken) {
    if (googleToken) {
      return $http.post(`${apiUrl}/auth/google/checkToken`, {googleToken})
      .catch(() => {
        tokenService.removeGoogle();
        return refreshToken();
      });
    } else {
      tokenService.removeGoogle();
      return refreshToken();
    }
  }

  function refreshToken () {
    const refreshIt = tokenService.getRefresh();
    const refresh = {
      refresh_token: refreshIt,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'refresh_token'
    };
    
    return $http.post(`${apiUrl}/auth/google/refresh`, refresh)
      .then(newToken => {
        tokenService.setGoogle(newToken.data);
      });
  }

  function fitStats (googleAuth, category) {

    return $http.post(`${apiUrl}/google/stats`, {googleAuth, category})
      .then(response => response.data);
  }

  return {

    checkValid,

    refreshToken,

    fitStats
  };

}
