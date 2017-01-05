userService.$inject = ['tokenService', '$http', 'apiUrl'];

export default function userService (tokenService, $http, apiUrl) {
  const current = tokenService.getCurrent();

  if (current.token) {
    $http.get(`${apiUrl}/auth/verify`)
      .catch(() => {
        tokenService.remove();
      });
  }

  function credential (endpoint) {
    return (credentials) => {
      return $http.post(`${apiUrl}/auth/${endpoint}`, credentials)
        .then(result => {
          tokenService.set(result.data.token);
        })
        .catch(err => {
          console.log(err);
        });
    };
  }

  function getMe (id) {
    return $http.get(`${apiUrl}/users/${id}`)
      .then(result => result.data);
  }

  function update (userToUpdate) {
    return $http.put(`${apiUrl}/users/${current.id}`, userToUpdate)
      .then(result => result.data);
  }

  function setGoals (userId, goals) {
    return $http.put(`${apiUrl}/users/setGoals/${userId}`, goals)
      .then(result => result.data);
  }

  return {
    //do we have token?
    //this returns not false (true) if there is a token
    isAuthenticated () {
      return !!tokenService.get();
    },

    logout () {
      tokenService.remove();
      tokenService.removeGoogle();
    },

    signin: credential('signin'),
    signup: credential('signup'),

    update,

    setGoals,

    getMe
  };

}
