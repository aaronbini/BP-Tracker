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

  this.submitGoals = () => {
    userService.setGoals(this.userId, this.goals)
      .then(user => {
        $state.go('dashboard', {user});
      })
      .catch(err => {
        console.log(err);
      });
  };

  // this.googleAuth = () => {
  //   $googleService.oAuth()
  //     .then(res => {
  //       console.log(res);
  //       this.success = 'Successfully authorized. You can now sync with Google Fit.';
  //     });
  // };

};
