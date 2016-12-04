import template from './google.html';
import styles from './google.scss';

export default {
  template,
  binding: {
    getFitStats: '<',
    checkValid: '<'
  },
  controller
};

controller.$inject = ['googleService', '$window'];
function controller (googleService, $window) {
  this.styles = styles;

  this.checkValid = () => {
    googleService.checkValid($window.localStorage.getItem('google'));
  };

  this.getFitStats = (category) => {
    googleService.checkValid($window.localStorage.getItem('google'))
      .then(() => {
        console.log($window.localStorage.getItem('google'));
        return googleService.fitStats($window.localStorage.getItem('google'), category);
      })
      .then(data => {
        //could change this to make this get request automatically and return all
        //relevant user stats
        this.weekRange = {};
        this.weekRange.start = data.then;
        this.weekRange.end = data.now;

        const weekArr = [];
        if (data.sendObj.calories) {
          for (let day in data.sendObj.calories) {
            weekArr.push({day: day, count: Math.floor(data.sendObj.calories[day])});
          }
          this.weekCalories = weekArr;
        }
        if (data.sendObj.steps) {
          for (let day in data.sendObj.steps) {
            weekArr.push({day: day, count: Math.floor(data.sendObj.steps[day])});
          }
          this.weekSteps = weekArr;
        }
      })
      .catch(err => console.log(err));
  };
}
