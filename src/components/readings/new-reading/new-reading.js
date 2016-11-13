import template from './new-reading.html';

export default {
  template,
  bindings: {},
  controller
};

controller.$inject = ['$window', 'readingService', '$state'];
function controller ($window, readingService, $state) {

  this.show = 'true';
  this.userId = $window.localStorage.getItem('userId');
  this.reading = {
    systolic: '',
    diastolic: ''
    // hoursSlept: ''
  };

  this.cancel = () => {
    this.show = 'false';
  };

  this.showForm = () => {
    this.show = 'true';
  };

  this.saveReading = () => {
    readingService.postNew(this.userId, this.reading)
      .then(reading => {
        $state.go('dashboard', {todayReading: reading});
      })
      .catch(err => console.log(err));
  };

}
