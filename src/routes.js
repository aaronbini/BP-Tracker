configRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function configRoutes($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      component: 'landing'
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
      //pass through objects but not on url
      params: {
        user: null,
        todayReading: null
      },
      resolve: {
        todayReading: ['$stateParams', p => {
          console.log(p);
          if (p) return p.todayReading;
        }],
        user: ['$stateParams', p => p.user]
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
