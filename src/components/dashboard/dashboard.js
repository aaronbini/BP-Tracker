import template from './dashboard.html';

export default {
  template,
  bindings: {},
  controller
};

controller.$inject = ['$window', 'userService', '$state', 'readingService'];
function controller ($window, userService, $state, readingService) {

  this.username = $window.localStorage.getItem('username');
  this.userId = $window.localStorage.getItem('userId');
  this.date = new Date();

  if ($state.params.todayReading) {
    this.todayReading = $state.params.todayReading;
  } else {
    readingService.todayCompleted(this.userId)
      .then(today => {
        this.todayReading = today.reading;
      })
      .catch(err => console.log(err));
  }

};
