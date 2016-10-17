import template from './dashboard.html';
import styles from './dashboard.scss';

export default {
  template,
  bindings: {},
  controller
};

controller.$inject = ['$window', 'userService', '$state', 'readingService'];
function controller ($window, userService, $state, readingService) {

  this.styles = styles;
  this.username = $window.localStorage.getItem('username');
  this.userId = $window.localStorage.getItem('userId');
  this.date = new Date();

  if ($state.params.todayReading) {
    this.todayReading = $state.params.todayReading;
  } else {
    readingService.todayCompleted(this.userId)
      .then(today => {
        console.log(today);
        this.todayReading = today.reading;
      })
      .catch(err => console.log(err));
  }

};
