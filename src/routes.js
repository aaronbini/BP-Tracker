configRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

//routing for app
export default function configRoutes($stateProvider, $urlRouterProvider) {
  $stateProvider
    // this is "home" state, displays by default, also when no token is found
    .state('home', {
      url: '/',
      component: 'landing'
    })
    .state('config', {
      url: '/config',
      data: {
        requiresAuth: true
      },
      resolve: {
        user: ['$stateParams', p => p.user],
      },
      component: 'config'
    })
    .state('dashboard', {
      url: '/dashboard',
      data: {
        requiresAuth: true
      },
      resolve: {
        todayReading: ['$stateParams', p => {
          if (p) return p.todayReading;
        }],
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
    .state('actions', {
      url: '/actions/:parentId/:parentName/:which',
      resolve: {
        parentId: ['$stateParams', p => p.parentId],
        which: ['$stateParams', p => p.which],
        parentName: ['$stateParams', p => p.parentName]
      },
      data: {
        requiresAuth: true
      },
      component: 'actionItems'
    })
    .state('account', {
      url: '/account',
      data: {
        requiresAuth: true
      },
      component: 'account'
    })
    //maybe should not have admin for viewing all users?
    .state('users', {
      url: '/users',
      data: {
        requiresAuth: true,
        requiresAdmin: true
      },
      component: 'listUsers'
    });

  $urlRouterProvider.otherwise('/');

};
