var express = require('express');
var favicon = require('serve-favicon');
var dotenv = require('dotenv');
var path = require('path');

dotenv.load(); //load environment variables

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

//TODO: Move to config
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
app.use(favicon(__dirname+"/favicon.ico"));
require('./config/express')(app);
require('./routes')(app);



//require('./api/verbal/tcs/insert')();
//require('./api/aptitude/insert')();

module.exports = app;
