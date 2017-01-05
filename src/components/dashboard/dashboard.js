import template from './dashboard.html';
import styles from './dashboard.scss';

export default {
  template,
  bindings: {
    todayReading: '<',
    user: '<'
  },
  controller
};

//TODO: reduce number of dependencies here.
controller.$inject = ['$window', 'userService', '$state', 'readingService', '$rootScope'];
function controller ($window, userService, $state, readingService, $rootScope) {
  //re-factor: Readings should live at dashboard (parent-level) and be passed down to other components via bindings.
  this.styles = styles;
  //these will be passed through from config.js, need to find all entry points to dashboard
  //and make sure user is passed through
  this.username = $window.localStorage.getItem('username');
  this.userId = $window.localStorage.getItem('userId');
  this.googleToken = $window.localStorage.getItem('google');
  this.date = new Date();

  if ($state.params.todayReading) {
    this.todayReading = $state.params.todayReading;
    $rootScope.completed = this.todayReading.completed;
  } else {
    readingService.todayCompleted(this.userId)
      .then(today => {
        this.todayReading = today.reading;
        $rootScope.completed = today.todayCompleted;
      })
      .catch(err => console.log(err));
  }

};
