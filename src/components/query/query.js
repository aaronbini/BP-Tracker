import template from './query.html';
import styles from './query.scss';

export default {
  template,
  bindings: {
    createLineGraph: '<',
    readings: '<',
    userId: '<',
  },
  controller
};

controller.$inject = ['readingService', 'chartService'];
function controller (readingService, chartService) {

  this.styles = styles;
  this.show = 'true';
  this.dateRange = {
    fromDate: null,
    toDate: null
  };

  const element1 = document.getElementById('graph');

  this.cancel = () => {
    this.show = 'false';
  };

  this.showForm = () => {
    this.show = 'true';
  };

  this.submit = () => {
    this.errorMessage = null;
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
      .catch(err => {
        console.log(err.data);
        this.errorMessage = err.data;
      });
  };
};
