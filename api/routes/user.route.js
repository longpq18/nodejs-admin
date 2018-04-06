'use strict';
module.exports = function(app) {
  var user = require('../controllers/user.controller');

  // user Routes
  app.route('/users')
    .get(user.list_all_users)
    .post(user.create_a_user);


  // app.route('/user/:userId')
  //   .get(user.read_a_task)
  //   .put(user.update_a_task)
  //   .delete(user.delete_a_task);
};
