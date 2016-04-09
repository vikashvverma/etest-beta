/**
 * Main application routes
 */

'use strict';

var errors = require('../components/errors');

module.exports = function (app) {

    // Insert routes below
    app.use('/api/verbal/tcs', require('../api/verbal/tcs'));
    app.use('/api/aptitude/tcs', require('../api/aptitude/tcs'));
    app.use('/.well-known/acme-challenge/5uZCbpgU9XQDE68-h6hY_XZxQLaB8RtslZddx7o4Yt8', function (req, res) {
        res.send('5uZCbpgU9XQDE68-h6hY_XZxQLaB8RtslZddx7o4Yt8.WaF4Dso8nznr8wEobxoTX6GGLEUMT9O6HzVGyMlOLsE');
    });
    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(errors[404]);

    // All other routes should redirect to the index.html
    app.route('/*')
        .get(function (req, res) {
            console.log(app.get('appPath'));
            res.sendFile(app.get('appPath') + '/index.html');
        });

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
};
