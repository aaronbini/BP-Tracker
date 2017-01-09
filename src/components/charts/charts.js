import template from './charts.html';
import styles from './charts.scss';

export default {
  template,
  bindings: {
    chartObjects: '<'
  },
  controller
};

controller.$inject = ['readingService', 'tokenService', 'chartService', 'userService'];
function controller (readingService, tokenService, chartService, userService) {
  
  this.styles = styles;
  this.readings = this.chartObjects.readings;

  const lineCanvas = document.getElementById('graph');
  const doughnutCanvas = document.getElementById('doughnut');

  this.createDoughnut = (element, data) => {
    //for re-rendering chart this is necessary
    if (this.doughnut) { this.doughnut.destroy(); }
    this.doughnut = chartService.configReadingsDoughnut(element, data);
  };
  
  this.createLineGraph = (element, data, sysGoal, diaGoal, unitType) => {
    if (this.chart) { this.chart.destroy(); }
    this.chart = chartService.configLineChart(element, data, sysGoal, diaGoal, unitType);
  };

  //could alternatively update mean and median readings as well as hours sleep/night
  //for the queried date range
  this.renderCharts = (initial) => {
    let formatted;
    if (initial) {
      formatted = chartService.formatDates(this.readings);
    } else {
      formatted = this.readings;
    }
    const unitType = chartService.setAxisConfig(formatted[0], formatted[formatted.length - 1]);
    
    this.createDoughnut(doughnutCanvas, this.chartObjects.categoryCount);
    this.createLineGraph(lineCanvas, formatted, this.user.sysGoal, this.user.diaGoal, unitType);
  };

  //on init
  userService.getMe(tokenService.getUserId())
      .then(user => {
        this.user = user;
        let tempReadings = [];
        Object.assign(tempReadings, this.readings);
        this.avgHours = this.chartObjects.categoryCount.hours;
        this.mean = readingService.getMean(tempReadings);
        this.median = readingService.getMedian(tempReadings);
        //render charts on page load
        this.renderCharts(true);
      })
      .catch(err => {
        console.log(err.message);
        this.errorMessage = err.message || 'Error with request';
      })

};
