var app = require('./config/app');
var http = require('http');


var port = process.env.PORT || 4000;
var server = app.listen(port, function() {
  console.log('Nodejs server listening on port ' + port);
});
