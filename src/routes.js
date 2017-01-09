configRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function configRoutes($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      component: 'landing'
    })
    .state('googleconfig', {
      url: '/googleconfig',
      data: {
        requiresAuth: true
      },
      params: {
        username: null,
        userId: null
      },
      resolve: {
        username: ['$stateParams', p => p.username],
        userId: ['$stateParams', p => p.userId]
      },
      component: 'googleInitConfig'
    })
    .state('config', {
      url: '/config/:username/:userId',
      data: {
        requiresAuth: true
      },
      resolve: {
        username: ['$stateParams', p => p.username],
        userId: ['$stateParams', p => p.userId]
      },
      component: 'config'
    })
    .state('dashboard', {
      url: '/dashboard',
      data: {
        requiresAuth: true
      },
      params: {
        user: null,
        todayReading: null
      },
      resolve: {
        todayReading: ['$stateParams', p => {
          if (p) return p.todayReading;
        }],
        hasGoogle: ['tokenService', t => t.hasGoogle],
        readings: ['readingService', 'tokenService', (r, t) => r.getByUser(t.getUserId())]
      },
      component: 'dashboard'
    })
    .state('newReading', {
      url: '/newReading',
      data: {
        requiresAuth: true
      },
      component: 'newReading'
    })
    .state('readings', {
      url: '/readings',
      data: {
        requiresAuth: true
      },
      component: 'readings'
    })
    .state('reading', {
      url: '/reading/:readingId',
      resolve: {
        readingId: ['$stateParams', p => p.readingId]
      },
      data: {
        requiresAuth: true
      },
      component: 'reading'
    })
    .state('account', {
      url: '/account',
      data: {
        requiresAuth: true
      },
      component: 'account'
    });

  $urlRouterProvider.otherwise('/');

};
