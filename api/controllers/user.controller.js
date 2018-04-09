'use strict';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('./../models/user.model');

// CREATES A NEW USER
router.post('/create', function (req, res) {
      User.find({email: req.body.email}, function(err, result){
        if(result.length > 0) {
          return res.status(500).send('The email exits in db')
        }

        User.create({
            email : req.body.email,
            password : req.body.password,
            status: req.body.status
        },
        function(err, user) {
          if (err) return res.status(500).send("There was a problem adding the information to the database.");
          res.status(200).send(user);
        })
      })
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

// DELETE USER
router.delete('/delete/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User "+ user.email +" was deleted.");
    });
});

// UPDATE USER
router.put('/update/:id', function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});

// Search by email
router.post('/search/:email', function(req, res) {
    User.find({email: req.body.email}, (err, user) => {
      if(user.length == 0) {
        return res.status(404).send('No user found')
      }

      if(err) {
        return res.status(500).send("There was a problem found the user")
      }

      res.status(200).send(user)
    })
})
module.exports = router;
