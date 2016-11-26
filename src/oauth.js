oauth.$inject = ['$authProvider', 'apiUrl'];

export default function oauth($authProvider, apiUrl) {
  const url = `${apiUrl}/auth/google`;
  const client_id = process.env.CLIENT_ID;
  $authProvider.oauth2({
    name: 'google',
    optionalUrlParams: ['access_type'],
    accessType: 'offline',
    url: url,
    clientId: client_id,
    requiredUrlParams: ['scope'],
    scope: ['profile+email+' + 'https://www.googleapis.com/auth/fitness.activity.read+' +
    'https://www.googleapis.com/auth/fitness.activity.write+' +
    'https://www.googleapis.com/auth/fitness.body.read+' +
    'https://www.googleapis.com/auth/fitness.body.write+' +
    'https://www.googleapis.com/auth/fitness.location.read+' +
    'https://www.googleapis.com/auth/fitness.location.write+' +
    'https://www.googleapis.com/auth/fitness.nutrition.read+' +
    'https://www.googleapis.com/auth/fitness.nutrition.write+'],
    redirectUri: window.location.origin,
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
  });
}
