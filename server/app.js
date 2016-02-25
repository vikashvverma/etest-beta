var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('express-jwt');
var dotenv = require('dotenv');
var cors = require('cors');
var mongoose = require('mongoose');

var routes = require('./routes/index');
var users = require('./routes/users');

dotenv.load();

var authenticate = jwt({
    secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
    audience: process.env.AUTH0_CLIENT_ID
});

var app = express();

var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: 'xT5YSDG3UVHkiSfG3Hk2hamkM',
    consumer_secret: 'B0I2SjkmqnGXt4r9tC6XVlaF8G76dltMxkcuumg8WQsOwtHHGR',
    access_token_key: '3113514491-Q9BffsoPJVYsRnWHAZh9Fu1p1ME6gnP2WIU6As5',
    access_token_secret: 'aBxX4OoXjm5Wm46ztGGGOmYSrusnOeM1GtGASPTIrR25j'
});

// Connect to database
mongoose.connect(process.env.MONGO_URI);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Request body parsing middleware should be above methodOverride
app.use('/secured', authenticate); //Make certain routes authenticated

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// var getTweets=require("./tweets")
// getTweets(600676733671575552); Remove after some time
app.get('/tweetCount/:id', function (req, res) {
    var params = {
        id: req.params.id
    };
    client.get('https://api.twitter.com/1.1/statuses/show.json', params, function (error, tweets, response) {
        if (!error) {
            console.log(tweets["retweet_count"]);
            res.status(200).json({
                count: tweets["retweet_count"]
            });
        } else {
            res.status(200).json({
                count: 0
            });
        }
    });
});

//Need to remove
app.get('/ping', function (req, res) {
    res.status(200).send({
        text: "All good. You don't need to be authenticated to call this"
    });
});

app.get('/secured/ping', function (req, res) {
    res.status(200).send({
        text: "All good. You only get this message if you're authenticated"
    });
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
