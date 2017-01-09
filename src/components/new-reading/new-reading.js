import template from './new-reading.html';
import styles from './new-reading.scss';

export default {
  template,
  bindings: {},
  controller
};

controller.$inject = ['tokenService', 'readingService', '$state', '$rootScope'];
function controller (tokenService, readingService, $state, $rootScope) {
  this.styles = styles;

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
    readingService.postNew(tokenService.getUserId(), this.reading)
      .then(reading => {
        $rootScope.$emit('today');
        this.reset();
        $state.go('dashboard', {todayReading: reading});
      })
      .catch(err => console.log(err));
  };

}
