import template from './config.html';

export default {
  template,
  bindings: {
    userId: '<',
    username: '<'
  },
  controller
};

controller.$inject = ['userService', '$state', 'tokenService'];
function controller (userService, $state, tokenService) {
  
  this.hasGoogle = tokenService.hasGoogle();
  this.goals = {
    sysGoal: null,
    diaGoal: null,
    perWeek: null,
    hoursSleep: null,
    caloriesDay: null,
    stepsDay: null,
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
