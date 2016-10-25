import chart from 'chart.js';

export default function chartService () {
  return {
    chart,

    formatDates (readings) {
      readings.forEach(e => {
        e.createdAt = Date.parse(e.createdAt);
      });
      return readings;
    },

    configDoughnut (countObj) {
      const dataPlot = {
        labels: [
          'Good',
          'Prehypertension',
          'Prehypertension I',
          'Prehypertension II',
          'Hypertensive Crisis'
        ],
        datasets: [
          {
            data: [countObj.good, countObj.pre, countObj.hypI, countObj.hypII, countObj.crisis],
            backgroundColor: [
              'rgba(0, 128, 0, 0.5)',
              'rgba(0, 255, 0, 0.5)',
              'rgba(255, 255, 0, 0.5)',
              'rgba(255, 165, 0, 0.5)',
              'rgba(255, 0, 0, 0.5)'
            ],
            hoverBackgroundColor: [
              'rgba(0, 128, 0, 1.0)',
              'rgba(0, 255, 0, 1.0)',
              'rgba(255, 255, 0, 1.0)',
              'rgba(255, 165, 0, 1.0)',
              'rgba(255, 0, 0, 1.0)'
            ]
          }]
      };
      return dataPlot;
    },

    configLineChart (readings) {
      const dataPlot = {
        datasets: [{
          label: 'Systolic',
          pointStyle: 'circle',
          pointHoverBorderWidth: 4,
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverRadius: 3,
          pointRadius: 2,
          data: []
        }, {
          label: 'Diastolic',
          pointStyle: 'circle',
          pointHoverBorderWidth: 4,
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverRadius: 3,
          pointRadius: 2,
          data: []
        }]
      };
      readings.forEach(e => {
        dataPlot.datasets[0].data.push({x: e.createdAt, y: e.systolic});
        dataPlot.datasets[1].data.push({x: e.createdAt, y: e.diastolic});
      });
      return dataPlot;
    }

  };

};
