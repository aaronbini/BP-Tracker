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
        tokenService.setGoogle(response.data.token);
        this.success();
      })
      .catch( err => {
        this.error = err;
        console.log(err);
      });
  };

}
