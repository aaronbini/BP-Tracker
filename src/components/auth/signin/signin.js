import template from './signin.html';

export default {
  template,
  bindings: {
    success: '&',
    cancel: '&'
  },
  controller
};

controller.$inject = ['userService', '$auth', 'tokenService'];
function controller(userService, $auth, tokenService) {
  this.credentials = {
    email: '',
    password: ''
  };

  this.authenticate = () => {
    return userService.signin(this.credentials)
      .then(() => {
        if (JSON.parse(tokenService.hasGoogle())) {
          $auth.authenticate('google')
            .then(response => {
              if (response.data.refresh_token) tokenService.setRefresh(response.data.refresh_token);
              tokenService.setGoogle(response.data);
              tokenService.set(response.data.token);
              this.success();
              return true;
            });
        } else {
          this.success();
          return true;
        }
      })
      .catch(error => {
        this.error = error;
        this.cancel();
        return false;
      });
  };
};
