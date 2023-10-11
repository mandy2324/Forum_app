const express = require('express');

const router = express.Router();
var bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.get('/', function(req, res, next) {
    res.status(200).json({'greeting': "Hello", 'lucky_num': 3}).send();
})


module.exports = router;