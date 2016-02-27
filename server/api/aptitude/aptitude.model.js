'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var TestSchema = new Schema({
    id: {type: Number, unique: true, required: true},
    question: {type: String, required: true},
    hasQImage: {type: Boolean, default:false},
    options: [{
        option1: {type: String, required: true},
        option2: {type: String, required: true},
        option3: {type: String, required: true},
        option4: {type: String, required: true}
    }],
    lod: {type: Number},
    exam: [{
        name:{type: String},
        qset:{type:Number}
    }],
    answer: {type: String},
    explanation: {type: Boolean, default:false},
    hasAExplanation: {type: Boolean, default:false},
    hasAnswerImage: {type: Boolean, default:false},
    section: [{type: String}],
    year: {type: String},
    qset: {type: Number},
    created_on: {type: Date, default: new Date()},
    attempted_on: {type: Date, default: new Date()},
    statistics: [{
        userId: {type: String, required: true},
        name: String,
        isCorrect: Boolean,
        attempted_on: {type: Date, default: new Date()}
    }]
});

module.exports = mongoose.model('Aptitude', TestSchema);
