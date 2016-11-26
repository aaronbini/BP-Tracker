userService.$inject = ['tokenService', '$http', 'apiUrl', '$auth'];

export default function userService (tokenService, $http, apiUrl, $auth) {
  const googleToken = tokenService.getGoogle();

  if (googleToken) {
    $http.post(`${apiUrl}/auth/google/checkToken`, {googleToken})
      .catch(() => {
        tokenService.removeGoogle();
        getNewToken();
      });
  } else {
    getNewToken();
  }

  function getNewToken () {
    $auth.authenticate('google')
      .then(response => {
        tokenService.removeGoogle();
        tokenService.setGoogle(response.data);
        tokenService.set(response.data.token);
      })
      .catch( err => {
        console.log(err);
      });
  }


  function buildAuthURI (scopes, id) {
    let baseString = 'https://accounts.google.com/o/oauth2/auth';
    let redirect_URI = 'http://localhost:8080/config';
    // let redirect_URI = 'https://www.getpostman.com/oauth2/callback';
    baseString += `?redirect_uri=${redirect_URI}&response_type=code&`;
    baseString += `client_id=${id}&scope=`;
    let fullURI = scopes.reduce((prev, curr) => {
      return `${prev}${curr}+`;
    }, baseString);
    return fullURI.slice(0, fullURI.length-1);

  };

  return {

    buildAuthURI,

    getNewToken
  };

}
