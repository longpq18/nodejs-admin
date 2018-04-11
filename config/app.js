var express = require('express')
var app = express()
var db = require('./db.config')
var UserController = require('./../api/controllers/user.controller');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use('/users', UserController);
module.exports = app
