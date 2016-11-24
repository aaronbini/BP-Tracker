import template from './charts.html';
import styles from './charts.scss';

export default {
  template,
  bindings: {},
  controller
};

controller.$inject = ['readingService', '$window', 'chartService'];
function controller (readingService, $window, chartService) {
  this.styles = styles;
  this.userId = $window.localStorage.getItem('userId');

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

  readingService.getByUser(this.userId)
    .then(readings => {
      if (!readings.readings.length) throw {error: 'No readings for this user.'};
      this.readings = readings.readings;
      this.categoryCount = readings.categoryCount;
      console.log(this.categoryCount);
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
      console.log(unitType);
      this.createLineGraph(element1, charts.chart1, unitType);
      this.createDoughnut(element2, charts.chart2);
    })
    .catch(err => console.log(err));
};
