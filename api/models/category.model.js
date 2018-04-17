'use strict';

var mongoose = require('mongoose');
var CategorySchema = new mongoose.Schema({
  name: String,
  status: Number
});
mongoose.model('category', CategorySchema);
module.exports = mongoose.model('category');
