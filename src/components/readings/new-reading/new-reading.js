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
        //do something with reading
        //send user to dashboard because only one reading per day
        console.log(reading);
      })
      .catch(err => console.log(err));
  };

}
