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
              'rgba(0, 128, 0, 1.0)',
              'rgba(0, 255, 0, 1.0)',
              'rgba(255, 255, 0, 1.0)',
              'rgba(255, 165, 0, 1.0)',
              'rgba(255, 0, 0, 1.0)'
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

    setAxisConfig (firstDate) {
      const now = new Date();
      const then = firstDate.createdAt;
      const elapsed = Math.floor(( now - then ) / 86400000);
      if (elapsed >= 15 && elapsed < 90) {
        return 'week';
      } else if (elapsed >= 90) {
        return 'month';
      } else {
        return 'day';
      }
    },

    configLineChart (readings) {
      const dataPlot = {
        datasets: [{
          label: 'Systolic',
          pointStyle: 'circle',
          fill: false,
          tension: 0.1,
          backgroundColor: 'coral',
          borderColor: 'coral',
          pointHoverBorderWidth: 3,
          pointHoverBorderColor: 'black',
          pointHoverRadius: 3,
          pointRadius: 2,
          data: []
        }, {
          label: 'Diastolic',
          pointStyle: 'circle',
          fill: false,
          tension: 0.1,
          backgroundColor: 'crimson',
          borderColor: 'crimson',
          pointHoverBorderWidth: 3,
          pointHoverBorderColor: 'black',
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
