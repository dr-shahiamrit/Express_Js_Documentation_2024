'use strict';


/*

Module dependencies 

*/


var cookieSession = require('cookie-session');
var express = require('express')

var app = express()


// add req.session cookie support
app.use(cookieSession({secret: 'many is cool'}));


// do something with the session
app.get('/', function(req, res){
    req.session.count = (req.session.count || 0) + 1
    res.send('viewed ' + req.session.count + ' times\n')
})


/* istanbul ignore next */

if(!module.parent) {
    app.listen(3000, ()=> {
        console.log('Express started on port 3000')
    })
}