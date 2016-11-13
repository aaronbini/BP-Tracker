import template from './config.html';

export default {
  template,
  bindings: {},
  controller
};

controller.$inject = ['$window', 'userService', '$state'];
function controller ($window, userService, $state) {
  this.userId = $state.params.userId;
  this.username = $state.params.username;

  //user init - set goals: sysGoal, diaGoal, readings per week, fitness goals, sleep tracking
  this.goals = {
    sysGoal: null,
    diaGoal: null,
    perWeek: null,
    hoursSleep: null
  };

  this.submitGoals = function () {
    userService.setGoals(this.userId, this.goals)
      .then(user => {
        $state.go('dashboard', {user});
      })
      .catch(err => {
        console.log(err);
      });
  };

};
