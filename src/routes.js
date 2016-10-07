configRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

//routing for app
export default function configRoutes($stateProvider, $urlRouterProvider) {
  $stateProvider
    // this is "home" state displays by default, also when no token is found
    .state('home', {
      url: '/',
      component: 'landing'
    })
    .state('dashboard', {
      url: '/dashboard',
      data: {
        requiresAuth: true
      },
      component: 'dashboard'
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
      component: 'companyDetail'
    })
    // .state('actions', {
    //   url: '/actions/:parentId/:parentName/:which',
    //   resolve: {
    //     parentId: ['$stateParams', p => p.parentId],
    //     which: ['$stateParams', p => p.which],
    //     parentName: ['$stateParams', p => p.parentName]
    //   },
    //   data: {
    //     requiresAuth: true
    //   },
    //   component: 'actionItemList'
    // })
    .state('user', {
      url: '/user',
      data: {
        requiresAuth: true
      },
      component: 'userDetail'
    })
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
