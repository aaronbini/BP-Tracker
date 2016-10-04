import angular from 'angular';

auth.$inject = ['$rootScope', 'userService', '$mdDialog', '$state'];

export default function auth($rootScope, userService, $mdDialog, $state) {

  $rootScope.$on('$stateChangeStart', (event, toState, toParams) => {
    if (toState.data && toState.data.requiresAdmin && !userService.isAdmin()) {

      event.preventDefault();
      console.log('Not the admin! Go home!');
      return $state.go('home');

    } else if (toState.data && toState.data.requiresAuth && !userService.isAuthenticated()) {

      event.preventDefault();
      $mdDialog.show({
        parent: angular.element(document.body),
        template: '<user-auth success="success()" cancel="cancel()"></user-auth>',
        controller: ['$scope', function($scope) {
          $scope.success = function(){
            $mdDialog.hide();
            return $state.go(toState.name, toParams);
          };
          $scope.cancel = () => {
            $mdDialog.hide();
          };
        }],
        clickOutsideToClose: true,
        escapeToClose: true
      });
    }
  });
  
};
