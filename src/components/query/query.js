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

  //need to add button that shows after querying readings
  //button would 'reset' charts to show all readings

  this.styles = styles;
  this.dateRange = {
    fromDate: null,
    toDate: null
  };

  const element1 = document.getElementById('graph');
  const element2 = document.getElementById('doughnut');

  this.submit = () => {
    this.errorMessage = null;
    readingService.getInRange(this.userId, this.dateRange)
      .then(userStats => {
        if (!userStats.readings.length) throw 'No readings in that range.';
        //readings should be passed through from dashboard, query should update parent readings
        //via two-way bindings
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
        this.errorMessage = err;
      });
  };
};
