import template from './charts.html';
import styles from './charts.scss';

export default {
  template,
  bindings: {},
  controller
};

controller.$inject = ['readingService', '$window', 'chartService', 'userService'];
function controller (readingService, $window, chartService, userService) {
  
  this.styles = styles;
  this.userId = $window.localStorage.getItem('userId');
  this.hasGoogle = $window.localStorage.getItem('has_google');

  const element1 = document.getElementById('graph');
  const element2 = document.getElementById('doughnut');

  userService.getMe(this.userId)
    .then(user => {

    })
    .catch(err => console.log(err));

  this.createDoughnut = (element, data) => {
    this.doughnut = new chartService.chart(element, {
      type: 'doughnut',
      data: data,
      options: {
        cutoutPercentage: 75
      }
    });
  };
  
  this.createLineGraph = (element, data, unitType) => {
    this.chart = new chartService.chart(element, {
      type: 'line',
      data,
      options: {
        tooltips: {
          enabled: true,
          mode: 'single',
          callbacks: {
            title: function(title) {
              let date = new Date(title[0].xLabel);
              return date.toLocaleDateString();
            }
          }
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: unitType
            },
            position: 'bottom'
          }],
          yAxes: [{
            stacked: false
          }]
        }
      }
    });
  };

  //this should really be done at the dashboard level, and then readings can be passed down.
  Promise.all([
    userService.getMe(this.userId),
    readingService.getByUser(this.userId)
  ]).then(([user, readings]) => {
    console.log('user: ', user);
    this.readings = [];
    this.sysGoal = user.sysGoal;
    this.diaGoal = user.diaGoal;
    //copy readings.readings to this.readings because the readingService.getMedian
    //method mutates the array, and was mutating this.readings before the graph was made
    Object.assign(this.readings, readings.readings);
    if (!readings.readings.length) throw {error: 'No readings for this user.'};
    this.categoryCount = readings.categoryCount;
    this.mean = readingService.getMean(readings.readings);
    this.median = readingService.getMedian(readings.readings);
    return {
      dateFormatted: chartService.formatDates(this.readings),
      categoryCount: this.categoryCount
    };
  })
  .then(chartObj => {
    return {
      chart1: chartService.configLineChart(chartObj.dateFormatted, this.sysGoal, this.diaGoal),
      chart2: chartService.configDoughnut(chartObj.categoryCount),
      firstDate: chartObj.dateFormatted[0]
    };
  })
  .then(charts => {
    console.log(charts.chart1);
    const unitType = chartService.setAxisConfig(charts.firstDate);
    this.createLineGraph(element1, charts.chart1, unitType);
    this.createDoughnut(element2, charts.chart2);
  })
  .catch(err => console.log(err));

};
