/* globals angular, chai */
const {assert} = chai;

describe('components', () => {

  const completed = {todayCompleted: true, reading: {sys: 125, dia: 75}};
  const readingsArray = [{sys: 125, dia: 75},{sys: 130, dia: 77}];
  const fit = {
    then: 1234, 
    now: 12345, 
    sendObj: {
      steps: {
        monday: 123, 
        tuesday: 1234
      }
    }
  };

  const readingService = {
    postNew(id, reading) {
      return Promise.resolve(reading);
    },
    todayCompleted() {
      return Promise.resolve(completed);
    },
    getInRange(id,range) {
      return Promise.resolve({readings: readingsArray, range});
    }
  };

  const googleService = {
    valid: false,
    checkValid () {
      this.valid = !this.valid;
      return Promise.resolve();
    },
    fitStats () {
      return Promise.resolve(fit);
    }
  };

  const chartService = {
    formatted: false,
    line: false,
    doughnut: false,
    configLineChart () {
      this.line = true;
    },
    configDoughnut () {
      this.doughnut = true;
    },
    formatDates () {
      this.formatted = true;
    }
  };

  const $mdDialog = {
    shown: false,
    hidden: false,
    show () {
      this.shown = true;
    },
    hide () {
      this.hidden = true;
    }
  };

  const userService = {
    loggedIn: true,
    setGoals(id, goal) {
      return Promise.resolve(goal);
    },
    isAuthenticated() {
      return true;
    },
    logout() {
      this.loggedIn = false;
    }
  };

  const $window = {
    localStorage: {
      token: 'token',
      username: 'aaron',
      google: 'google123',
      refresh_token: 'refresh_it',
      userId: '123',
      getItem: function (id) {
        return this[id];
      }
    }
  };

  const $state = {
    params: {
      userId: '123',
      username: 'aaron'
    },
    go(location, obj) {
      this.changed = obj;
    }
  };

  beforeEach(angular.mock.module('components'));

  let $component, $scope, component;
  beforeEach(angular.mock.inject(($rootScope, $componentController) => {
    $component = $componentController;
    $scope = $rootScope;
    // component = $component('newReading', {$window, readingService, $state, $scope});
  }));

  describe('new reading component', () => {

    beforeEach(() => {
      component = $component('newReading', {$window, readingService, $state, $scope});
    });

    // component = $component('newReading', {$window, readingService, $state, $scope});

    it('initializes with proper controller properties', () => {
      // const component = $component('newReading', {$window, readingService, $state, $scope});
      assert.equal(component.show, true);
      assert.equal(component.userId, '123');
      assert.deepEqual(component.reading, {systolic: '', diastolic: ''});
    });

    it('cancel sets component.show to false', () => {
      // const component = $component('newReading', {$window, readingService, $state, $scope});
      component.cancel();
      assert.notOk(component.show);
    });

    it('showForm sets component.show to true', () => {
      // const component = $component('newReading', {$window, readingService, $state, $scope});
      component.showForm();
      assert.ok(component.show);
    });

    it('properly calls saveReading', done => {
      // const component = $component('newReading', {$window, readingService, $state, $scope});
      component.saveReading();
      
      setTimeout(() => {
        assert.deepEqual($state.changed, {todayReading: component.reading});
        assert.ok($scope.completed);
        done();
      });
    });

  });

  describe('config component', () => {
    
    beforeEach(() => {
      component = $component('config', {userService, $state});
    });

    it('initializes proper controller properties', () => {
      assert.ok(component.goals);
      assert.ok(component.userId);
      assert.ok(component.username);
    });

    it('submit goals calls the userService.setGoals', done => {
      component.submitGoals(component.userId, component.goals);

      setTimeout(() => {
        assert.ok($state.changed);
        done();
      });
    });

  });

  describe('header component', () => {

    beforeEach(() => {
      component = $component('header', {userService, $state, $mdDialog, $window, readingService, $scope});
    });

    it('initializes with proper config and calls readingService.todayCompleted', done => {
      assert.ok(component.userId);
      assert.ok(component.username);
      assert.ok(component.isAuthenticated);
      setTimeout(() => {
        assert.deepEqual(component.completed, completed.todayCompleted);
        assert.deepEqual($scope.completed, completed.todayCompleted);
        done();
      });
    });

    it('this.logout calls userService.logout', () => {
      component.logout();
      assert.notOk(userService.loggedIn);
    });

    it('prompt calls $mdDialog.show()', () => {
      assert.notOk($mdDialog.shown);
      component.prompt();
      assert.ok($mdDialog.shown);
    });
    
  });

  describe('query component', () => {

    const createLineGraph = function () {
      this.lineGraph = true;
    };

    const createDoughnut = function () {
      this.doughnutGraph = true;
    };

    beforeEach(() => {
      component = $component('query', {readingService, chartService}, {createLineGraph, createDoughnut});
    });

    it('initializes with proper config', () => {
      assert.ok(component.show);
      assert.ok(component.dateRange);
    });

    it('cancel() sets show to false', () => {
      component.cancel();
      assert.notOk(component.show);
    });

    it('showForm() sets show to true', () => {
      component.showForm();
      assert.ok(component.show);
    });

    it('call to submit properly calls readingService and chartService functions', done => {
      component.submit();
      
      setTimeout(() => {
        assert.ok(component.readings.length === 2);
        assert.ok(component.lineGraph, 'should be true');
        assert.ok(component.doughnutGraph);
        assert.ok(chartService.formatted);
        assert.ok(chartService.line);
        assert.ok(chartService.doughnut);
        done();
      });
    });
    
  });

  describe('google component', () => {

    const getFitStats = function () {};
    const checkValid = function () {};

    beforeEach(() => {
      component = $component('google', {googleService, $window});
    });

    it('getFitStats() calls googlService.checkValid(), fitStats()', done => {
      component.getFitStats('steps');

      setTimeout(() => {
        assert.ok(googleService.valid);
        assert.ok(component.weekRange.start);
        assert.ok(component.weekRange.end);
        assert.ok(component.week.steps.length === 2);
        done();
      });
      
    });

    it('checkValid calls googleService.checkValid()', () => {
      component.checkValid();
      assert.notOk(googleService.valid);
    });

  });

});