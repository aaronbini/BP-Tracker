import template from './new-reading.html';
import styles from './new-reading.scss';

export default {
  template,
  bindings: {},
  controller
};

controller.$inject = ['$window', 'readingService', '$state', '$rootScope'];
function controller ($window, readingService, $state, $rootScope) {
  this.styles = styles;

  this.userId = $window.localStorage.getItem('userId');
  this.reset = () => {
    this.reading = {
      systolic: '',
      diastolic: '',
      hours: ''
    };
  };

  this.reset();

  this.cancel = () => {
    this.reset();
  };

  this.saveReading = () => {
    readingService.postNew(this.userId, this.reading)
      .then(reading => {
        $rootScope.$emit('today');
        $state.go('dashboard', {todayReading: reading});
      })
      .catch(err => console.log(err));
  };

}
