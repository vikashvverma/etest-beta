var express = require('express');
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

require('./config/express')(app);
require('./routes')(app);

//Beware: may affect users' data
//require('./api/verbal/tcs/insert')();

//Beware:
//require('./api/aptitude/insert')();

module.exports = app;
