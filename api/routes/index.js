const users = require('./user.route')

module.exports = function(app, db) {
  users(app, db);
};
