import template from './query.html';

export default {
  template,
  bindings: {
    readings: '<',
    createLineGraph: '<',
    userId: '<'
  },
  controller
};

controller.$inject = ['readingService', '$window', 'chartService'];
function controller (readingService, $window, chartService) {

  this.show = 'true';
  // this.userId = $window.localStorage.getItem('userId');
  this.dateRange = {
    fromDate: null,
    toDate: null
  };

  // this.createLineGraph = createLineGraph;
  console.log(this.userId);
  console.log(this.createLineGraph);
  console.log(this.readings);

  const element1 = document.getElementById('graph');

  this.cancel = () => {
    this.show = 'false';
  };

  this.showForm = () => {
    this.show = 'true';
  };

  this.submit = () => {
    console.log('submitted');
    readingService.getInRange(this.userId, this.dateRange)
      .then(readings => {
        this.readings = readings;
        return chartService.formatDates(this.readings);
      })
      .then(dateFormatted => {
        return chartService.configChart(dateFormatted);
      })
      .then(dataPlot => {
        this.createLineGraph(element1, dataPlot);
      })
      .catch(err => console.log(err));
  };
};
