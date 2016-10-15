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

    configChart (readings) {
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
