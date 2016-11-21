oauth.$inject = ['$authProvider', 'apiUrl'];

export default function oauth($authProvider, apiUrl) {
  const url = `${apiUrl}/auth/google`;
  const client_id = process.env.CLIENT_ID || '549358026338-cja381ls92s94kuc818132h5ohlg6pif.apps.googleusercontent.com';
  // $authProvider.google({url, clientId: client_id});
  $authProvider.oauth2({
    name: 'google',
    url: url,
    clientId: client_id,
    requiredUrlParams: ['scope'],
    scope: ['profile+email'],
    redirectUri: window.location.origin,
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
  });
}

// 'https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=&redirect_uri=http://localhost:8080&scope=openid%20profile%20email&display=popup&state=g0w4vv8qfzn9dqzxxeyz7u8fr'
// 'https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=&redirect_uri=http://localhost:8080&scope=openid%20profile%20email&display=popup&state=gd8bqo3byyel0kzvqoz3vunmi'
// 'https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=549358026338-cja381ls92s94kuc818132h5ohlg6pif.apps.googleusercontent.com&redirect_uri=http://localhost:8080'
// 'https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=549358026338-cja381ls92s94kuc818132h5ohlg6pif.apps.googleusercontent.com&redirect_uri=http://localhost:8080&scope=profilenullemail'
