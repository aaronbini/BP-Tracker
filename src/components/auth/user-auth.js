import template from './user-auth.html';

export default {
  template,
  bindings: {
    success: '&',
    cancel: '&'
  },
  controller: function () {
    this.action = 'signin';
  }
};
