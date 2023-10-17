const express = require('express');
const router = express.Router();
var ThreadObj = require('../models/threads');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');

router.get('/', function(req, res, next) {
    ThreadObj.find().then((docs) => {
        if(docs) {
            res.status(200).json(docs);
        } else {
            throw new Error;
        }
    }).catch((err) => {
        res.status(400).json({message: "An error occurred fetching threads.", error: err.message})
    })
});

router.post('/', jsonParser, function(req, res, next) {
    const reqBody = req.body;
    const newThread = new ThreadObj(reqBody);

    newThread.save().then((doc) => {
        res.status(201).json(doc);
        console.log(doc)
    }).catch((err) => {
        res.status(400).json({ message: err.message});
    })
});

router.put('/', jsonParser, function(req, res, next) {
    const reply = req.body;

    ThreadObj.updateOne({_id: req.body._id}, {
        $push: { replies: reply.reply}
    }).then((doc) => {
        res.status(200).json(doc);
        console.log(doc)
    }).catch((err) => {
        res.status(400).json({ message: err.message});
    })
});

// Delete thread by id
router.delete('/', jsonParser, function(req, res, next) {
    const deleteId = req.body;

    ThreadObj.deleteOne({_id: req.body._id}).then((doc) => {
        res.status(200).json(doc);
    }).catch((err) => {
        res.status(400).json({ message: err.message});
    })
})


module.exports = router;
