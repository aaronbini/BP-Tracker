import template from './header.html';

export default {
  template,
  controller
};

controller.$inject = ['userService', '$state', '$mdDialog', '$window', 'readingService'];

function controller(userService, $state, $mdDialog, $window, readingService) {

  this.username = $window.localStorage.getItem('username');
  this.userId = $window.localStorage.getItem('userId');

  if (this.userId) {
    readingService.todayCompleted(this.userId)
    .then(completed => {
      
      this.completed = completed.todayCompleted;
      console.log(this.completed);
    })
    .catch(err => console.log(err));
  }

  this.logout = ()=>{
    userService.logout();
    $state.go('home');
  };

  this.detailView = ()=>{
    $state.go('user');
  };

  this.isAuthenticated = userService.isAuthenticated;

  this.prompt = ()=>{
    $mdDialog.show({
      parent: angular.element(document.body),
      template: '<user-auth success="success()" cancel="cancel()"></user-auth>',
      controller: ['$scope', function($scope) {
        $scope.success = function(){
          $mdDialog.hide();
          return $state.go('dashboard', {username: this.username});
        };
        $scope.cancel = () => {
          $mdDialog.hide();
        };
      }],
      clickOutsideToClose: true,
      escapeToClose: true
    });
  };

  var originatorEv; // necessary? no idea.
  this.openMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };
};
