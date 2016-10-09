import template from './data-query.html';

export default {
  template,
  bindings: {
    readings: '='
  },
  controller
};

controller.$inject = ['readingService', '$window'];
function controller (readingService, $window) {
  console.log(this.readings);
  console.log('in data-query component');
  this.show = 'true';
  this.userId = $window.localStorage.getItem('userId');
  this.dateRange = {
    fromDate: null,
    toDate: null
  };

  this.cancel = () => {
    this.show = 'false';
  };

  this.showForm = () => {
    this.show = 'true';
  };

  this.submit = () => {
    readingService.getInRange(this.userId, this.dateRange)
      .then(readings => this.readings = readings)
      .catch(err => console.log(err));
  };
};
