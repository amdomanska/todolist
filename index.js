"use strict"

var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}))
.use(session({secret: 'todotopsecret'}))
/* If there is no to do list in the session,
we create an empty one in the form of an array before continuing */

.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})

app.get('/todo', function(req, res) {
  res.render('todo.ejs', {todolist: req.session.todolist});
})

.post('/todo/add', function(req, res) {
  if (req.body.newtask != '') {
    req.session.todolist.push(req.body.newtask);
  }
  res.redirect('/todo');
})

.get('/todo/delete/:id', function(req, res) {
  if (req.params.id != '') {
    req.session.todolist.splice(req.params.id,1);
  }
  res.redirect('/todo');
})

.use(function(req, res, next){
    res.redirect('/todo');
});





app.listen(8080);
