import template from './user-auth.html';

export default {
  template,
  bindings: {
    success: '&',
    cancel: '&'
  },
  controller
};

controller.$inject = ['$auth', 'tokenService'];
function controller ($auth, tokenService) {
  this.action = 'signin';

  this.authenticate = provider => {
    $auth.authenticate(provider)
      .then(response => {
        if (response.data.refresh_token) tokenService.setRefresh(response.data.refresh_token);
        tokenService.setGoogle(response.data);
        tokenService.set(response.data.token);
        this.success();
        return true;
      })
      .catch( err => {
        this.error = err;
        console.log(err);
        return false;
      });
  };

}
