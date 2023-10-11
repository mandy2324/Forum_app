const express = require('express');
const User = require('../models/users');

const router = express.Router();
var bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// Get all users
router.get('/user', jsonParser, function(req, res) {
    const users = User.find().then((doc) => {
        console.log(doc);
        res.status(200).json(doc);
    }).catch((err) => res.status(400).json(err));
})

// Create new user
router.post('/user', jsonParser, function(req, res) {
    const user = req.body;
    const newUser = new User(user);
    console.log(req.body);

    newUser.save().then((doc) => {
        res.status(201).json(newUser);
        console.log(doc); 
    }).catch((err) => {
        console.log(err);
        res.status(400).json({message: "Cannot create another user with this username"});
    });
})

// Sign in and authenticate user. Request body should have username and password
router.post('/auth', jsonParser, function(req, res) {
    const user = req.body
    User.findOne(user).then((doc) => {
        if (doc) {
            console.log(doc);
            res.status(200).json({
                                    _id: doc._id,
                                    username: doc.username
                                });
        } else {
            res.status(400).json("User with these credentials was not found");
        }
    }).catch((err) => res.status(400).json(err));
})

router.delete('/user', jsonParser, function(req, res) {
    User.deleteOne({_id: req.body._id}).then((doc) => {
        res.status(200).json(doc);
    }).catch((err) => res.status(400).json(err))
})

router.delete('/user/:username', jsonParser, function(req, res) {
    User.deleteOne({username: req.params.username}).then((doc) => {
        res.status(200).json(doc);
    }).catch((err) => res.status(400).json(err))
})

module.exports = router;
