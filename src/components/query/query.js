import template from './query.html';
import styles from './query.scss';

export default {
  template,
  bindings: {
    createLineGraph: '<',
    createDoughnut: '<',
    readings: '<',
    userId: '<',
    doughnut: '<',
    chart: '<',
    renderCharts: '<'
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

  this.resetReadings = () => {
    this.queried = false;
    this.renderCharts();
  }; 

  this.submit = () => {
    this.errorMessage = null;
    this.queried = true;
    readingService.getInRange(this.userId, this.dateRange)
      .then(userStats => {
        if (!userStats.readings.length) throw 'No readings in that range.';
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
        this.chart.destroy();
        this.doughnut.destroy();
        this.createLineGraph(element1, charts.chart1);
        this.createDoughnut(element2, charts.chart2);
      })
      .catch(err => {
        this.errorMessage = err;
      });
  };
};
