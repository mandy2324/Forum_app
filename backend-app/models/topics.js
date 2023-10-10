const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }
}, {__v: false});

module.exports = mongoose.model("Topic", topicSchema);