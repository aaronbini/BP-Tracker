configHttp.$inject = ['$httpProvider'];

export default function configHttp($httpProvider) {
  $httpProvider.interceptors.push(interceptor);
};

interceptor.$inject = ['tokenService', '$state'];
function interceptor(tokenService, $state) {
  return {
    request(config) {
      config.headers = config.headers || {};

      const token = tokenService.get();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    responseError(response) {
      if (response.status >= 400 && response.status < 500) {
        $state.go('home');
      }
      return Promise.reject(response);
    }
  };

};
