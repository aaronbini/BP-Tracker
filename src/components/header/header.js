import template from './header.html';
import styles from './header.scss';

export default {
  template,
  controller
};

controller.$inject = ['userService', '$state', '$mdDialog', '$window', 'readingService', '$rootScope'];

function controller(userService, $state, $mdDialog, $window, readingService, $rootScope) {

  this.styles = styles;
  this.username = $window.localStorage.getItem('username');
  this.userId = $window.localStorage.getItem('userId');
  this.error;

  if (this.userId) {
    readingService.todayCompleted(this.userId)
    .then(completed => {
      this.completed = completed.todayCompleted;
      $rootScope.completed = completed.todayCompleted;
    })
    .catch(err => console.log(err));
  }

  this.uiOnParamsChanged = function(newParams) {
    console.log('new params: ', newParams);
  };

  this.logout = ()=>{
    userService.logout();
    $state.go('home');
  };

  this.detailView = ()=>{
    //not yet implemented
    $state.go('user');
  };

  this.isAuthenticated = userService.isAuthenticated;
  this.prompt = () => {
    $mdDialog.show({
      parent: angular.element(document.body),
      template: '<user-auth success="success(action)" cancel="cancel()"></user-auth>',
      controller: ['$scope', function($scope) {

        $scope.success = (action) => {
          this.userId = $window.localStorage.getItem('userId');
          this.username = $window.localStorage.getItem('username');
          readingService.todayCompleted(this.userId)
          .then(completed => {
            this.completed = completed.todayCompleted;
            $mdDialog.hide();
            if (action === 'signup') {
              console.log('username: ', this.username);
              console.log('userID: ', this.userId);
              return $state.go('config', {username: this.username, userId: this.userId});
            }
            return $state.go('dashboard', {username: this.username});
          })
          .catch(err => console.log(err));
        };

        $scope.cancel = () => {
          $mdDialog.hide();
        };

      }],
      clickOutsideToClose: true,
      escapeToClose: true
    });
  };
};
