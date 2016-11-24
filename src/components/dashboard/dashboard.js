import template from './dashboard.html';
import styles from './dashboard.scss';

export default {
  template,
  bindings: {},
  controller
};

controller.$inject = ['$window', 'userService', '$state', 'readingService', '$rootScope'];
function controller ($window, userService, $state, readingService, $rootScope) {

  this.styles = styles;
  this.username = $window.localStorage.getItem('username');
  this.userId = $window.localStorage.getItem('userId');
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
