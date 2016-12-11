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

  this.getAverage = (readings) => {
    let sysTotal = 0;
    let diaTotal = 0;
    readings.forEach(e => {
      sysTotal += e.systolic;
      diaTotal += e.diastolic;
    });
    this.average = {sys: sysTotal / readings.length, dia: diaTotal / readings.length};
  };

  this.getMean = (readings) => {
    const half = Math.floor(readings.length / 2);
    let sysSort = readings.sort((a,b) => {
      return a.systolic < b.systolic;
    });
    let diaSort = readings.sort((a,b) => {
      return a.diastolic < b.diastolic;
    });
    console.log({sys: sysSort[half].systolic, dia: diaSort[half].diastolic});
    this.mean = {sys: sysSort[half].systolic, dia: diaSort[half].diastolic};
  };
  this.getMean([{systolic: 120, diastolic: 75},{systolic: 130, diastolic: 85},{systolic: 110, diastolic: 65}, {systolic: 122, diastolic: 80}, {systolic: 122, diastolic: 70}]);

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
      this.getAverage(this.readings);
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
