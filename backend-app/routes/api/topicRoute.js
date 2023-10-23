const express = require('express');
const router = express.Router();
var TopicObj = require('../../models/topics');
var ThreadObj = require('../../models/threads')
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.get('/', async function(req, res, next) {
    async function populateThreads(docs) {
        const resultListInner = []
        for (const item of docs) {
            await ThreadObj.find({topic: item.name}).then((docs2) => {
                if(docs2) {
                    let temp = {
                        _id: item._id,
                        topic: item.name,
                        threads: docs2
                    }
                    
                    resultListInner.push(temp)
                } else {
                    let temp2 = {
                        _id: item._id,
                        topic: item.name,
                        threads: null
                    }
                    resultListInner.push(temp2)
                }
            });
        }
        return resultListInner;
    }
    
    var resultList = []
    TopicObj.find().then(async (docs) => {
        if(docs) {
            resultList = await populateThreads(docs);
            res.status(200).json(resultList)
        } else {
            throw new Error;
        }
    }).catch((err) => {
        res.status(400).json({message: "An error occurred fetching threads.", error: err.message})
    })
});

router.get('/:topicName', function(req, res, next) {
    const tempTopic = req.params.topicName.replaceAll('-', ' ');
    TopicObj.findOne({name: tempTopic}).then((docs) => {
        if(docs) {
            ThreadObj.find({topic: tempTopic}).then((docs2) => {
                if(docs2) {
                    let temp = {
                        topic: tempTopic,
                        threads: docs2
                    }
                    res.status(200).json(temp);
                } else {
                    res.status(400).json({message: "no threads under this name"})
                }
            })
        } else {
            throw new Error;
        }
    }).catch((err) => {
        res.status(400).json({message: "An error occurred fetching threads and topics.", error: err.message})
    })
})

router.post('/', jsonParser, function(req, res, next) {
    const reqBody = req.body;
    const newTopic = new TopicObj(reqBody);

    newTopic.save().then((doc) => {
        res.status(201).json(doc);
        console.log(doc)
    }).catch((err) => {
        res.status(400).json({ message: err.message});
    })
});

router.put('/', jsonParser, function(req, res, next) {
    const reply = req.body;

    TopicObj.updateOne({_id: req.body._id}, {
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

    TopicObj.deleteOne({_id: req.body._id}).then((doc) => {
        res.status(200).json(doc);
    }).catch((err) => {
        res.status(400).json({ message: err.message});
    })
});

module.exports = router;