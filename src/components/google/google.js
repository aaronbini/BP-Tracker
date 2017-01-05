import template from './google.html';
import styles from './google.scss';

export default {
  template,
  controller
};

controller.$inject = ['googleService', 'tokenService', 'userService', 'chartService', '$timeout'];
function controller (googleService, token, userService, chartService, $timeout) {
  this.styles = styles;
  this.weekRange = {};
  this.week = {};
  const cats = ['steps', 'calories'];

  userService.getMe(token.getUserId())
    .then(user => {
      this.user = user;
    })
    .catch(err => this.errorMessage = err.message || err);


  this.checkValid = () => {
    return googleService.checkValid(token.getGoogle());
  };

  this.getFitStats = (categories) => {
    return Promise.all(categories.map(category => {
      return googleService.fitStats(token.getGoogle(), category, token.getUserId());
    }));
  };

  this.showCharts = () => {
    this.week.steps.forEach(weekDay => {
      const element = document.getElementById('steps' + weekDay.day);
      chartService.configGoogleSteps(element, 'doughnut', 'steps', weekDay.count, this.user.stepsDay);
    });

    this.week.calories.forEach(weekDay => {
      const element = document.getElementById('calories' + weekDay.day);
      chartService.configGoogleSteps(element, 'doughnut', 'calories', weekDay.count, this.user.caloriesDay);
    });
  };

  if (JSON.parse(token.hasGoogle())) {
    this.checkValid()
    .then(() => this.getFitStats(cats))
    .then(stats => {
      
      this.weekRange.start = stats[0].then;
      this.weekRange.end = stats[0].now;

      stats.forEach(data => {
        const weekArr = [];
        for (let day in data.sendObj[data.category]) {
          weekArr.push({day, count: Math.floor(data.sendObj[data.category][day])});
        }
        this.week[data.category] = weekArr;
      });

      $timeout(this.showCharts, 1000);

    })
    .catch(err => console.log(err));
  } 
};