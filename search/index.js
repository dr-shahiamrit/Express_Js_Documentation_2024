'use strict'

// install redis first:
// https://redis.io/

// then:
// $ npm install redis
// $ redis-server

/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');
var redis = require('redis');

// Create the Redis client
var db = redis.createClient();

// Handle connection errors
db.on('error', function (err) {
  console.error('Redis error:', err);
});

// Connect the Redis client
db.connect().then(() => {
  console.log('Connected to Redis');
}).catch((err) => {
  console.error('Failed to connect to Redis:', err);
});

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

// populate search
// Ensure that the Redis client is connected before making commands
db.sAdd('ferret', 'tobi');
db.sAdd('ferret', 'loki');
db.sAdd('ferret', 'jane');
db.sAdd('cat', 'manny');
db.sAdd('cat', 'luna');

/**
 * GET search for :query.
 */
app.get('/search/:query?', function(req, res, next) {
  var query = req.params.query;
  db.sMembers(query, function(err, vals) {
    if (err) return next(err);
    res.send(vals);
  });
});

/**
 * GET client javascript.
 */
app.get('/client.js', function(req, res) {
  res.sendFile(path.join(__dirname, 'client.js'));
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
};
