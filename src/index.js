import angular from 'angular';
import app from './app';
import routes from './routes';
import oauth from './oauth';
import auth from './auth';
import http from './http';
import './scss/main.scss';

app.constant('apiUrl', process.env.API_URL || '/api');
app.constant('clientId', process.env.CLIENT_ID);
app.constant('clientSecret', process.env.CLIENT_SECRET);

app.config(http);
app.config(routes);
app.config(oauth);
app.run(auth);


angular.bootstrap(document, [app.name]);
