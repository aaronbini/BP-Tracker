import template from './google-init-config.html';

export default {
  template,
  bindings: {
    username: '<',
    userId: '<'
  },
  controller
};

controller.$inject = ['$auth', 'tokenService', '$state'];
function controller ($auth, tokenService, $state) {

  //$auth is satellizer provider that is configured (attached) to the app in index.js
  this.bypassGoogle = () => {
    $state.go('config', {username: this.username, userId: this.userId});
  };
  
  this.authenticate = provider => {
    $auth.authenticate(provider)
      .then(response => {
        if (response.data.refresh_token) tokenService.setRefresh(response.data.refresh_token);
        tokenService.setGoogle(response.data);
        tokenService.set(response.data.token);
        $state.go('config', {username: this.username, userId: this.userId});
      })
      .catch( err => {
        //set up html error handling
        this.error = err;
        console.log(err);
      });
  };

}