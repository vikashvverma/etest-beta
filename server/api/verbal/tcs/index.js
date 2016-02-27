'use strict';

var express = require('express');
var controller = require('./tcs.verbal.controller');
var auth = require('../../../auth');


var router = express.Router();
router.get('/', controller.index);
router.get('/:id', controller.fetch);
//router.post('/', controller.create);

//router.use(auth.isAuthenticated());
router.get('/stat/all',controller.getAllStatistics);
router.get('/stat/rank/:id',controller.getRankStatistics);
router.get('/stat/:id',controller.getStatistics);
router.put('/:id', controller.update);
router.patch('/:testId/:id', controller.patch);
//router.delete('/:id', controller.destroy);

module.exports = router;
