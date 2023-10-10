const mongoose = require('mongoose')

const threadSchema = new mongoose.Schema({
    topic: String,
    title: String,
    author: String,
    content: String,
    replies: [{
        author: String,
        content: String
    }]
}, {__v: false});

module.exports = mongoose.model("Thread", threadSchema);