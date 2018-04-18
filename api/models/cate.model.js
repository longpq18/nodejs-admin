'use strict';

var mongoose = require('mongoose');
var Cate = new mongoose.Schema({
  name: String,
  status: Number
});
mongoose.model('categories', Cate);
module.exports = mongoose.model('categories');
