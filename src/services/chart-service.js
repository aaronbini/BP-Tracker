import chart from 'chart.js';

export default function chartService () {

  chart.defaults.global.legend.display = false;

  function setLineData (label, color, radius, hoverRadius) {
    return {
      label,
      pointStyle: 'circle',
      fill: false,
      tension: 0.4,
      backgroundColor: color,
      borderColor: color,
      pointHoverBorderWidth: hoverRadius,
      pointHoverBorderColor: 'black',
      pointHoverRadius: hoverRadius,
      pointRadius: radius,
      borderWidth: 2,
      data: []
    };
  }

  return {
    chart,

    formatDates (readings) {
      const formattedReadings = readings.map(e => {
        e.createdAt = Date.parse(e.createdAt);
        return e;
      });
      return formattedReadings;
    },

    configGoogleSteps (context, chartType, category, taken, goal) {
      let short = goal - taken;
      return new chart(context, {
        type: 'doughnut',
        data: {
          labels: [ category, 'short' ],
          datasets: [{
            data: [ taken, short ],
            backgroundColor: [ 'cornflowerblue' ],
            hoverBackgroundColor: [ 'blue' ]
          }]
        },
        options: {
          cutoutPercentage: 75
        }
      });
    }, 

    configReadingsDoughnut (context, countObj) {
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
      return new chart(context, {
        type: 'doughnut',
        data: dataPlot,
        options: {
          cutoutPercentage: 75
        }
      });
    },

    setAxisConfig (firstDate) {
      const now = new Date();
      const then = firstDate.createdAt;
      const elapsed = Math.floor(( now - then ) / 86400000);
      console.log('elapsed: ', elapsed);
      if (elapsed >= 15 && elapsed < 90) {
        return 'week';
      } else if (elapsed >= 90) {
        return 'month';
      } else {
        return 'day';
      }
    },

    configLineChart (context, readings, sysGoal, diaGoal, unitType) {
      const dataPlot = {
        datasets: [
          setLineData('Systolic', 'coral', 1, 2),
          setLineData('Diastolic', 'crimson', 1, 2),
          setLineData('Systolic Goal', 'blue', 0, 0),
          setLineData('Diastolic Goal', 'green', 0, 0)
        ]
      };
      readings.forEach(e => {
        dataPlot.datasets[0].data.push({x: e.createdAt, y: e.systolic});
        dataPlot.datasets[1].data.push({x: e.createdAt, y: e.diastolic});
        dataPlot.datasets[2].data.push({x: e.createdAt, y: sysGoal});
        dataPlot.datasets[3].data.push({x: e.createdAt, y: diaGoal});
      });
      return new chart(context, {
        type: 'line',
        data: dataPlot,
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
    }

  };

};
