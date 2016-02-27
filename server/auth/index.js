'use strict'
var jwt = require('express-jwt');

function isAuthenticated() {
    var authenticate = jwt({
        secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
        audience: process.env.AUTH0_CLIENT_ID
    });
    return authenticate
}

exports.isAuthenticated = isAuthenticated;
