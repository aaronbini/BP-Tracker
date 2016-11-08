import template from './query.html';
import styles from './query.scss';

export default {
  template,
  bindings: {
    createLineGraph: '<',
    createDoughnut: '<',
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
  const element2 = document.getElementById('doughnut');


  this.cancel = () => {
    this.show = 'false';
  };

  this.showForm = () => {
    this.show = 'true';
  };

  this.submit = () => {
    this.errorMessage = null;
    readingService.getInRange(this.userId, this.dateRange)
      .then(userStats => {
        this.readings = userStats.readings;
        return {
          dateFormatted: chartService.formatDates(this.readings),
          categoryCount: userStats.categoryCount
        };
      })
      .then(obj => {
        return {
          chart1: chartService.configLineChart(obj.dateFormatted),
          chart2: chartService.configDoughnut(obj.categoryCount)
        };
      })
      .then(charts => {
        this.createLineGraph(element1, charts.chart1);
        this.createDoughnut(element2, charts.chart2);
      })
      .catch(err => {
        console.log(err);
        this.errorMessage = err;
      });
  };
};
