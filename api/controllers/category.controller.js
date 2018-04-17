'use strict';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Category = require('./../models/category.model');
var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();



router.get('/lists', function (req, res) {
    Category.find({}, function (err, cats) {
        console.log(res)
        if (err) return res.status(500).send("There was a problem finding the categories.");
        res.status(200).send({result: cats});
    });
});


module.exports = router;
