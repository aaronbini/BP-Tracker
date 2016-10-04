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
    .state('companies', {
      url: '/companies',
      data: {
        requiresAuth: true
      },
      component: 'listCompanies'
    })
    // Will be /company/:id or /company?id once the db is set up
    .state('company', {
      url: '/company/:companyId',
      resolve: {
        companyId: ['$stateParams', p => p.companyId]
      },
      data: {
        requiresAuth: true
      },
      component: 'companyDetail'
    })
    .state('positions', {
      url: '/positions',
      data: {
        requiresAuth: true
      },
      component: 'positions'
    })
    .state('position', {
      url: '/position/:positionId',
      resolve: {
        positionId: ['$stateParams', p => p.positionId]
      },
      data: {
        requiresAuth: true
      },
      component: 'positionDetail'
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
      component: 'actionItemList'
    })
    .state('contacts', {
      url: '/contacts',
      data: {
        requiresAuth: true
      },
      component: 'contacts'
    })
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
