'use strict';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('./../models/user.model');
var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();


// Login
router.post('/login', ( req, res ) => {
    const user = {
      email: req.body.email,
      password: req.body.password
    }

    const token = jwt.sign({user: user}, process.env.KEY_SECRECT)
    User.find( user, ( err, result ) => {
      if(result.length > 0) {
        return res.status(200).send({success: true, token: token})
      } else {
        return res.status(500).send({success: false})
      }
    })
})

// CREATES A NEW USER
router.post('/create', ( req, res ) => {
      User.find({email: req.body.email}, ( err, result ) => {
        if(result.length > 0) {
          return res.status(500).send('The email exits in db')
        }

        var str = new Array(6).join().replace(/(.|$)/g,
                          function(){
                            return ((Math.random()*36)|0).toString(36)[Math.random()<.5?"toString":"toUpperCase"]();
                          }
                        );

        User.create({
            email : req.body.email,
            password : req.body.password,
            status: 1,
            emailVerifyCode: str
        },
        ( err, user ) => {
          if (err) return res.status(500).send("There was a problem adding the information to the database.");
          sendEmail(user.email, str)
          res.status(201).send(user); // create success
        })
      })
});

function sendEmail(email, str) {
  nodemailer.createTestAccount((err, account) => {
        let sentTo = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Node server" <no-reply@hklog.vn>',
            to: email,
            subject: 'Verify code',
            text: 'Verify code',
            html: `<h2>Your verify code: ${str}</h2>`
        };

        // send mail with defined transport object
        sentTo.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
     });

}

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/lists', ( req, res ) => {
    User.find({}, ( err, users ) => {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

// DELETE USER
router.delete('/delete/:id', ( req, res ) =>  {
    User.findByIdAndRemove(req.params.id, ( err, user ) => {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User was deleted.");
    });
});

// UPDATE USER
router.put('/update/:id', ( req, res ) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, ( err, user ) => {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});

// Get user info
router.get('/:id', ( req, res ) => {
    User.find({_id: req.params.id}, (err, user) => {
      if(err) {
        return res.status(500).send('There was a problem found the user')
      }
      res.status(200).send({result: user})
    })
})

// Search by email
router.get('/search/:email', ( req, res ) => {
    User.find({email: req.params.email}, ( err, user ) => {
      if(user.length == 0) {
        return res.status(404).send('No user found')
      }

      if(err) {
        return res.status(500).send("There was a problem found the user")
      }

      res.status(200).send(user)
    })
})

// verify email
router.post('/verify_email', ( req, res ) => {
  var token = req.body.token
  var code = req.body.code

  jwt.verify(token, process.env.KEY_SECRECT, ( err, data ) => {
    if (err) {
      return res.status(500).send('Token is not correct')
    } else {
      var email = data.user.email
      User.find({email: email, emailVerifyCode: code}, (err, response) => {
        console.log(response)
        if(response.length === 0) {
          return res.status(500).send({result: 'The code is not correct'})
        }

        if(err) {
          return res.status(500).send('The system error')
        }

        return res.status(200).send({result: 'Verified'})

      })
    }
  });

})
module.exports = router;
