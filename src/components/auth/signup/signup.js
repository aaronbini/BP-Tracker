import template from './signup.html';

export default {
  template,
  bindings: {
    success: '&',
    cancel: '&'
  },
  controller
};

controller.$inject = ['userService'];
function controller (userService) {
  this.credentials = {
    username: '',
    email: '',
    password: ''
  };

  this.authenticate = () => {
    return userService.signup(this.credentials)
      // eslint-disable-next-line no-unused-vars
      .then((user) => {
        this.success({action: 'signup'});
        return true;
      })
      .catch((err) => {
        this.error = err;
        this.cancel();
        return false;
      });
  };
};
