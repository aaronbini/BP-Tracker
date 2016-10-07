import template from './signin.html';

export default {
  template,
  bindings: {
    success: '&',
    cancel: '&'
  },
  controller
};

controller.$inject = ['userService'];
function controller(userService) {
  this.credentials = {
    email: '',
    password: ''
  };

  this.authenticate = () => {
    return userService.signin(this.credentials)
      .then(() => {
        this.success();
        return true;
      })
      .catch(error => {
        this.error = error;
        this.cancel();
        return false;
      });
  };
};
