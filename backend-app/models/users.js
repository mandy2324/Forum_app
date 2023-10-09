const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,
}, {__v: false})

module.exports =  mongoose.model('User', userSchema);