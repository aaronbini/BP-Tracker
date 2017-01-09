import template from './query.html';
import styles from './query.scss';

export default {
  template,
  bindings: {
    createLineGraph: '<',
    createDoughnut: '<',
    doughnut: '<',
    chart: '<',
    renderCharts: '<'
  },
  controller
};

controller.$inject = ['readingService', 'chartService', 'tokenService', 'userService'];
function controller (readingService, chartService, tokenService, userService) {

  this.styles = styles;
  this.dateRange = {
    fromDate: null,
    toDate: null
  };

  const lineCanvas = document.getElementById('graph');
  const doughnutCanvas = document.getElementById('doughnut');

  this.resetReadings = () => {
    this.queried = false;
    this.renderCharts();
  }; 

  this.submit = () => {
    this.errorMessage = null;
    this.queried = true;

    Promise.all([
      userService.getMe(tokenService.getUserId()),
      readingService.getInRange(tokenService.getUserId(), this.dateRange)
    ]).then(([user, readings]) => {

      if (!readings.readings.length) throw {error: 'No readings in that range.'};
      const sysGoal = user.sysGoal;
      const diaGoal = user.diaGoal;
      const formatted = chartService.formatDates(readings.readings);
      const unitType = chartService.setAxisConfig(formatted[0]);
      const categoryCount = readings.categoryCount;
      
      this.createDoughnut(doughnutCanvas, categoryCount);
      this.createLineGraph(lineCanvas, formatted, sysGoal, diaGoal, unitType);
    })
    .catch(err => {
      this.errorMessage = err;
      console.log(err);
    });
    
  };
};
