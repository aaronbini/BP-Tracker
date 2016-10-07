import template from './header.html';

export default {
  template,
  bindings: {

  },
  controller
};

controller.$inject = ['userService', '$state', '$mdDialog', '$window'];
function controller (userService, $state, $mdDialog, $window) {
  this.userId = $window.localStorage.getItem('id');

  // if (this.userId) {
  //   userService.getMe(this.userId)
  //   .then(user => {
  //     this.username = user.username;
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  // };

  this.logout = () => {
    userService.logout();
    $state.go('home');
  };

  this.isAuthenticated = userService.isAuthenticated;

  this.showSignin = function () {
    $mdDialog.show({
      parent: angular.element(document.body),
      // targetEvent: $event,
      // controllerAs: '$ctrl',
      // bindToController: true,
      template: '<user-auth success="success()", cancel="cancel()"></user-auth>',
      controller: ['$scope', function($scope) {
        $scope.success = () => {
          $mdDialog.hide();
          return $state.go('dashboard');
        },
        $scope.cancel = () => {
          $mdDialog.hide();
        };
      }],
      clickOutsideToClose: true,
      escapeToClose: true
    });
  };
};
