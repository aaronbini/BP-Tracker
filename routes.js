'use strict';

var express = require('express');
var router = express.Router();
var User = require('./models').User;

router.param('uID', function(req, res, next, id){
  User.findById(req.params.uID, function(err, doc) {
    if (err) return next(err);
    if (!doc) {
      err = new Error('Not Found');
      err.status = 404;
      return next(err);
    }
    req.user = doc;
    return next();
  });
});

//POST /users
// Route for creating a new user
router.post('/', function(req, res, next){
  var user = new User(req.body);
  user.save(function(err, user){
    if (err) return next(err);
    res.status(201);
    res.json(user);
  });
});

//GET /users/:uID/readings
//Route for all of users bp readings
router.get('/:uID/readings', function(req, res){
  res.json(req.user.readings);
});

//TODO: need get route for users readings in certain category
//GET /users/:uID/readings/:category
//implemented with an array method in the route, should this be done with
// a mongoose query instead?

router.get('/:uID/readings/:cat', function(req, res){
  //this will need to be modified
  var cat = req.params.cat;
  var catReadings = req.user.readings.filter(function(reading){
    return reading.category === cat;
  });
  res.json(catReadings);
});

//POST request for new readings
router.post('/:uID/readings', function(req, res){
  req.user.readings.push(req.body);
  req.user.save(function(err, user){
    if (err) return next(err);
    res.status(201);
    res.json(user);
  });
});

module.exports = router;
