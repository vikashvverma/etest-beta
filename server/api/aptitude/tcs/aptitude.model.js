'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var TestSchema = new Schema({
  id:{type:Number,unique:true,required:true},
  name:{type:String},
  qset:{type:Number},
  attempted_on:{type:Date,default:new Date()},
  statistics:[{
    userId:{type:String,required:true},
    name:String,
    score:Number,
    attempted:Number,
    correct:Number,
    incorrect:Number,
    skipped:Number,
    time:Number,
    attempted_on:{type:Date,default:new Date()}
  }]
});

module.exports = mongoose.model('TCSAptitude', TestSchema);
