import template from './google.html';
import styles from './google.scss';

export default {
  template,
  controller
};

controller.$inject = ['googleService', '$window'];
function controller (googleService, $window) {
  this.styles = styles;
  this.weekRange = {};
  this.week = {};
  const cats = ['steps', 'calories'];

  this.checkValid = () => {
    return googleService.checkValid($window.localStorage.getItem('google'));
  };

  this.getFitStats = (categories) => {
    return Promise.all(categories.map(category => {
      return googleService.fitStats($window.localStorage.getItem('google'), category);
    }));
  };

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
    })
    .catch(err => console.log(err));

};