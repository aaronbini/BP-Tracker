import angular from 'angular';
import router from 'angular-ui-router';
import components from './components';
import services from './services';
import md from 'angular-material';
import messages from 'angular-messages';
import 'angular-material/angular-material.css';
import 'angular-ui-router/release/stateEvents';

// angular.module('momentjs',[])
//   .factory('moment', function ($window) {
//     if($window.moment){
//       $window._thirdParty = $window._thirdParty || {};
//       $window._thirdParty.moment = $window.moment;
//       try { delete $window.moment; } catch (e) {$window.moment = undefined;}
//     }
//     var moment = $window._thirdParty.moment;
//     return moment;
//   });

const app = angular.module('bpTracker', [
  router,
  angular.module('ui.router.state.events').name,
  components,
  services,
  md,
  messages,
  // d3
]);

app.config(['$mdThemingProvider', function($mdThemingProvider){
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('deep-orange')
    .backgroundPalette('teal')
    .warnPalette('red')
    // .dark();
}]);

export default app;
