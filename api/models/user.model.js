'use strict';

var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  status: Number,
  emailVerifyCode: String
});
mongoose.model('users', UserSchema);
module.exports = mongoose.model('users');
