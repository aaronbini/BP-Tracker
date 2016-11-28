userService.$inject = ['tokenService', '$http', 'apiUrl', '$auth'];

export default function userService (tokenService, $http, apiUrl, $auth) {
  const googleToken = tokenService.getGoogle();

  //bini.aaron.job refresh token
  //1/3MPApMPgaajitVOhi41gMBdNjNphTc4CB9wTRQKB9LFabP8u1zgYvRcrdwzzg5M5
  function checkValid () {
    if (googleToken) {
      $http.post(`${apiUrl}/auth/google/checkToken`, {googleToken})
      .catch(() => {
        tokenService.removeGoogle();
        refreshToken();
      });
    } else {
      tokenService.removeGoogle();
      refreshToken();
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
        console.log('newToken', newToken);
        tokenService.setGoogle(newToken.data);
      })
      .catch(err => console.log(err));
  }

  function fitStats (googleAuth) {
    return $http.post(`${apiUrl}/google/googleStats`, {googleAuth})
      .then(response => {
        console.log('google fit response: ', response);
        return response;
      })
      .catch(err => console.log(err));
  }

  return {

    // getNewToken,

    checkValid,

    refreshToken,

    fitStats
  };

}

// function getNewToken () {
//   $auth.authenticate('google')
//     .then(response => {
//       tokenService.setGoogle(response.data);
//       tokenService.set(response.data.token);
//     })
//     .catch( err => {
//       console.log(err);
//     });
// }
