import template from './dashboard.html';
import styles from './dashboard.scss';

export default {
  template,
  bindings: {},
  controller
};

controller.$inject = ['$window', 'userService', '$state', 'readingService', '$rootScope', 'googleService', 'tokenService'];
function controller ($window, userService, $state, readingService, $rootScope, googleService, tokenService) {

  this.styles = styles;
  this.username = $window.localStorage.getItem('username');
  this.userId = $window.localStorage.getItem('userId');
  this.googleToken = $window.localStorage.getItem('google');
  console.log('google token: ', this.googleToken);
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

  // this.checkValid = () => {
  //   googleService.checkValid();
  // };
  //
  // this.getFitStats = () => {
  //   googleService.checkValid()
  //     .then(() => {
  //       console.log('google access token valid');
  //       return googleService.fitStats(this.googleToken);
  //     })
  //     .then(data => {
  //       console.log('google fit data');
  //       console.log(data);
  //     })
  //     .catch(err => console.log(err));
  // };

};
