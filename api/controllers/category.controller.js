'use strict'

var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())
var Category = require('./../models/cate.model')

// get all category
router.get('/lists', ( req, res ) => {
    Category.find({}, ( err, cats ) => {
        if (err) return res.status(500).send("There was a problem finding the categories.")
        res.status(200).send({result: cats})
    });
});

// create category
router.post('/create', ( req, res ) => {
    var name = req.body.name
    Category.find({name: name}, (err, result) => {
      var lenght = result.length
      if(lenght > 0) {
        return res.status(500).send({success: false, result: 'Name is exits in system.'})
      }

      Category.create({
        name: name,
        status: 1
      })

      if(err) {
        return res.status(500).send({success: false, result: 'Server error.'})
      }

      return res.status(201).send({success: true, result: 'Category is created'})

    })
})

// edit category
router.put('/edit/:id', ( req, res ) => {
    Category.findByIdAndUpdate(req.params.id, req.body, { new: true }, ( err, result ) => {
        if(err) {
          return res.status(500).send({success: false, result: 'Error update category'})
        }

        return res.status(200).send({success: true, result: result})
    })
})

// delete category
router.delete('/delete/:id', ( req, res ) => {
    Category.findByIdAndRemove( req.params.id, ( err, result ) => {
        if(err) {
          res.status(500).send({success: false, result: 'Error delete.'})
        }

        res.status(200).send({success: true, result: 'Success delete.'})
    })
})


























module.exports = router;
