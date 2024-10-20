'use strict';

// install redis first:
// https://redis.io/

// then:
// $ npm install redis online
// $ redis-server

/**
 * Module dependencies.
 */

const express = require('express');
const redis = require('redis');

// Create a Redis client with Redis 4.x
const db = redis.createClient();

// Handle Redis connection
db.on('error', (err) => {
  console.log('Redis Client Error', err);
});

// Connect to Redis
db.connect().catch(console.error);

// Online tracking module
const online = require('./online')(db);

// App setup
const app = express();

// Activity tracking middleware using the User-Agent string
app.use((req, res, next) => {
  // fire-and-forget
  online.add(req.headers['user-agent']);
  next();
});

/**
 * Helper to create HTML list from IDs.
 */
function list(ids) {
  return '<ul>' + ids.map((id) => '<li>' + id + '</li>').join('') + '</ul>';
}

/**
 * GET users online.
 */
app.get('/', (req, res, next) => {
  online.last(5, (err, ids) => {
    if (err) return next(err);
    res.send('<p>Users online: ' + ids.length + '</p>' + list(ids));
  });
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
