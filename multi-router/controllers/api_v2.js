'use strict'

var express = require('express')

var apiv2 = express.Router()

apiv2.get('/', function(req, res) {
    res.send('Hello from APIv2 root router.')
})

apiv2.get('/users', function(req, res) {
    res.send('List of the APIv2 users.')
})

module.exports = apiv2;