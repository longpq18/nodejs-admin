var express = require('express'),
 app = express(),
 port = process.env.PORT || 4000,
 mongoose = require('mongoose'),
 User = require('./api/models/user.model'),
 bodyParser = require('body-parser');

// connect to mongoose

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/admin')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// set api
var router = express.Router()

// router.get('/', function(req, res) {
// 	res.json({ message: 'This is API' })
// })

app.get('/', function(req, res) {
	res.send('Home page')
})

app.use('/api', router)

app.listen(port)

console.log(' Server started on port: ', port)