import template from './charts.html';
import styles from './charts.scss';

export default {
  template,
  bindings: {},
  controller
};

controller.$inject = ['readingService', '$window', 'chartService', 'googleService'];
function controller (readingService, $window, chartService, googleService) {
  this.styles = styles;
  this.userId = $window.localStorage.getItem('userId');
  this.hasGoogle = $window.localStorage.getItem('has_google');

  const element1 = document.getElementById('graph');
  const element2 = document.getElementById('doughnut');

  this.createDoughnut = (element, data) => {
    this.doughnut = new chartService.chart(element, {
      type: 'doughnut',
      data: data
    });
  };
  //chart sys over dia on same graph
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

  //TODO: add Promise.all for google fit aggregation - so far:
  //weekly steps and weekly calories burnt, also should do the same for
  //user sleep tally

  readingService.getByUser(this.userId)
    .then(readings => {
      if (!readings.readings.length) throw {error: 'No readings for this user.'};
      this.readings = readings.readings;
      this.categoryCount = readings.categoryCount;
      return {
        dateFormatted: chartService.formatDates(this.readings),
        categoryCount: this.categoryCount
      };
    })
    .then(chartObj => {
      return {
        chart1: chartService.configLineChart(chartObj.dateFormatted),
        chart2: chartService.configDoughnut(chartObj.categoryCount),
        firstDate: chartObj.dateFormatted[0]
      };
    })
    .then(charts => {
      const unitType = chartService.setAxisConfig(charts.firstDate);
      this.createLineGraph(element1, charts.chart1, unitType);
      this.createDoughnut(element2, charts.chart2);
    })
    .catch(err => console.log(err));

};
