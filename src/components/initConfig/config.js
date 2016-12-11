import template from './config.html';

export default {
  template,
  bindings: {},
  controller
};

controller.$inject = ['userService', '$state'];
function controller (userService, $state) {
  this.userId = $state.params.userId;
  this.username = $state.params.username;

  this.goals = {
    sysGoal: null,
    diaGoal: null,
    perWeek: null,
    hoursSleep: null
  };

  this.submitGoals = () => {
    userService.setGoals(this.userId, this.goals)
      .then(user => {
        $state.go('dashboard', {user});
      })
      .catch(err => {
        console.log(err);
      });
  };

};
