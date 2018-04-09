var express = require('express')
var app = express()
var db = require('./db.config')
var UserController = require('./../api/controllers/user.controller');
app.use('/users', UserController);
module.exports = app
