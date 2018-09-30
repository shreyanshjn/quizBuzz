var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Question = new Schema({
    topic: {
        type: String,
        required: true
    },
    question_one: {
        type: String,
        required: true
    },
    question_two: {
        type: String,
        required: true
    },
    question_three: {
        type: String,
        required: true
    },
    question_four: {
        type: String,
        required: true
    },
    question_five: {
        type: String,
        required: true
    },
});


module.exports = mongoose.model('Question', Question);
