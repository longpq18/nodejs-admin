var app = require('./config/app');
var http = require('http');

// http.createServer(function (request, response) {
// response.writeHead(200, {
//     'Content-Type': 'text/plain',
//     'Access-Control-Allow-Origin' : '*',
//     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
// });

var port = process.env.PORT || 4000;
var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
