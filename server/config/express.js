var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');
var errorHandler = require('errorhandler');
var mongoose = require('mongoose');
module.exports = function (app) {

  // Connect to MongoLab's MongoDB database
  mongoose.connect(process.env.MONGO_URI);

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(cookieParser());

  if ('production' === process.env.NODE_ENV) {
    //app.use(favicon(path.join(path.normalize(__dirname + '/../../'), 'public', 'favicon.ico')));
    app.use(express.static(path.join(path.normalize(__dirname + '/../../'), 'public')));
    app.set('appPath', path.normalize(__dirname + '/../../') + '/public');
    app.use(morgan('dev'));
  }

  if ('development' === process.env.NODE_ENV || 'test' === process.env.NODE_ENV) {
    //app.use(require('connect-livereload')());
    app.use(express.static(path.join(path.normalize(__dirname + '/../../'), '.tmp')));
    app.use(express.static(path.join(path.normalize(__dirname + '/../../'), 'client')));
    app.set('appPath', path.normalize(__dirname + '/../../') + '/client');
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }

};
