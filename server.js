'use strict';

var express = require('express'),
  routes = require('./routes'),
  port = process.env.PORT || 3000,
  request = require('request'),
  jsonParser = require('body-parser').json,
  logger = require('morgan'),
  app = express();

app.use(logger('dev'));
app.use(jsonParser());

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bpTracker', function(err) {
  if (err) {
    console.log('Failed connecting to Mongodb');
  } else {
    console.log('Successfully connected to Mongodb');
  }
});

var db = mongoose.connection;

db.on('error', function(){
  console.error('connection error', err);
});

db.once('open', function(){
  console.log('db connection successful');
});

app.use(express.static('./'));

app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE');
    return res.status(200).json({});
  }
  next();
});

app.use('/users', routes);

//catch 404 and forward to error handler
app.use(function(req, res, next){
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//Error handler
app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

// app.get('/*', function(req, res){
//   console.log('routing');
//   res.sendFile('/index.html',{root:__dirname + '/'});
// });

app.listen(port, function(){
  console.log('Express server is listening on Port', port);
});
