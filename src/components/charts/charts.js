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
  this.createLineGraph = (element, data) => {
    this.chart = new chartService.chart(element, {
      type: 'line',
      fill: false,
      data,
      options: {
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'day'
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
      this.readings = readings.readings;
      this.categoryCount = readings.categoryCount;
      console.log(this.categoryCount);
      return {dateFormatted: chartService.formatDates(this.readings), categoryCount: this.categoryCount};
    })
    .then(chartObj => {
      return {chart1: chartService.configLineChart(chartObj.dateFormatted), chart2: chartService.configDoughnut(chartObj.categoryCount)};
    })
    .then(charts => {
      this.createLineGraph(element1, charts.chart1);
      this.createDoughnut(element2, charts.chart2);
    })
    .catch(err => console.log(err));

};

// this.createLineGraph = (element, series) => {
//   console.log('in graph function, series: ', series);
//   const graph = new this.rickshaw.Graph({
//     element,
//     renderer: 'line',
//     series
//   });
//
//   const x_axis = new this.rickshaw.Graph.Axis.Time({graph: graph});
//   // const y_axis = new this.rickshaw.Graph.Axis.Y({
//   //   graph,
//   //   orientation: 'left',
//   //   tickFormat: this.rickshaw.Fixtures.Number.formatKMBT,
//   //   element: document.getElementById('y_axis')
//   // });
//   new this.rickshaw.Graph.Legend({
//     element: document.getElementById('legend'),
//     graph
//   });
//
//   graph.render();
//   x_axis.render();
// };
