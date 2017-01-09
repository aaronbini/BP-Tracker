import template from './dashboard.html';
import styles from './dashboard.scss';

export default {
  template,
  bindings: {
    todayReading: '<',
    user: '<',
    hasGoogle: '<',
    readings: '<'
  },
  controller
};

controller.$inject = ['tokenService', '$state', 'readingService'];
function controller (tokenService, $state, readingService) {

  this.styles = styles;
  this.username = tokenService.getUsername();
  this.date = new Date();
  this.errorMessage;

  if ($state.params.todayReading) {
    this.todayReading = $state.params.todayReading;
  } else {
    readingService.todayCompleted(tokenService.getUserId())
      .then(today => {
        this.todayReading = today.reading;
      })
      .catch(err => {
        this.errorMessage = err.message || 'Error with request.';
        console.log(err);
      });
  }

};
