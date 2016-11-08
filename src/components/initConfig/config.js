import template from './config.html';

export default {
  template,
  bindings: {},
  controller
};

controller.$inject = ['$window', 'userService', '$state'];
function controller ($window, userService, $state) {
  this.userId = $window.localStorage.getItem('userId');
  //user init - set goals: sysGoal, diaGoal, readings per week, fitness goals, sleep tracking
  this.goals = {
    sys: null,
    dia: null,
    perWeek: null,
  };

  this.submitGoals = function () {
    userService.submitGoals(this.userId, this.goals)
      .then(user => {
        $state.go('dashboard', {user});
      })
      .catch(err => {
        console.log(err);
      });
  };

};
