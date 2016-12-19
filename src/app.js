import angular from 'angular';
import router from 'angular-ui-router';
import components from './components';
import services from './services';
import md from 'angular-material';
import messages from 'angular-messages';
import 'angular-material/angular-material.css';
import 'angular-ui-router/release/stateEvents';
import satellizer from 'satellizer';

const app = angular.module('bpTracker', [
  router,
  angular.module('ui.router.state.events').name,
  components,
  services,
  md,
  messages,
  satellizer
]);

app.config(['$mdThemingProvider', function($mdThemingProvider){
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('deep-orange')
    .backgroundPalette('teal')
    .warnPalette('red');
}]);

export default app;
