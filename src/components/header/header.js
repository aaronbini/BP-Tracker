import template from './header.html';
import styles from './header.scss';

export default {
  template,
  controller
};

controller.$inject = ['userService', '$state', '$mdDialog', 'tokenService', 'readingService', '$rootScope'];

function controller(userService, $state, $mdDialog, token, readingService, $rootScope) {

  this.styles = styles;
  this.username = token.getUsername();
  this.userId = token.getUserId();
  this.isAuthenticated = userService.isAuthenticated;
  this.error;
  // this.completed = false;

  $rootScope.$on('today', () => {
    this.completed = true;
  });

  if (this.userId) {
    readingService.todayCompleted(token.getUserId())
    .then(completed => {
      this.completed = completed.todayCompleted;      
    })
    .catch(err => console.log(err));
  }

  this.logout = ()=>{
    userService.logout();
    $state.go('home');
  };

  this.detailView = ()=>{
    //not yet implemented
    $state.go('user');
  };

  this.prompt = () => {
    $mdDialog.show({
      parent: angular.element(document.body),
      template: '<user-auth success="success(action)" cancel="cancel()"></user-auth>',
      controller: ['$scope', function($scope) {

        $scope.success = (action) => {
          this.userId = token.getUserId();
          this.username = token.getUsername();
          readingService.todayCompleted(this.userId)
          .then(completed => {
            this.completed = completed.todayCompleted;
            $mdDialog.hide();
            if (action === 'signup') {
              return $state.go('googleconfig', {username: this.username, userId: this.userId});
            } else {
              return $state.go('dashboard', {username: this.username});
            }
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
