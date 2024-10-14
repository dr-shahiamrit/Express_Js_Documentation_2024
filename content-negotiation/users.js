'use strict'

var users = require('./db')

exports.html = function(req, res) {
    res.send('<ul>' + users.map(function(users) {
        return '<li>' + users.name + '</li>';
    }).join('') + '</ul>');
};

exports.json = function(req, res) {
    res.json(users);
}