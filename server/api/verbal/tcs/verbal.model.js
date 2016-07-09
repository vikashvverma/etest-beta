'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
//var UserSchema=new Schema({
//  userId:{type:String,required:true},
//  marks:Number,
//  errors:Number,
//  warnings:Number
//});
var TestSchema = new Schema({
  id: {type: Number, unique: true, required: true},
  names: [{type: String}],
  title: String,
  question: {type: String, required: true},
  outline: {type: String, required: true},
  statistics: [{
    userId: {type: String, required: true},
    name: String,
    score: Number,
    time: Number,
    error: Number,
    warnings: Number,
    attempted_on: {type: Date, default: new Date()}
  }],
  created_on: {type: Date, default: new Date()},
  asked: [{type: Number}],
  answers: [{type: String}]
});

module.exports = mongoose.model('TCSVerbal', TestSchema);
