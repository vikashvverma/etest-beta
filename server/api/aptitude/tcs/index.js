/**
 * Created by Vikash on 3/02/16.
 */
'use strict';

var express = require('express');
var controller = require('./tcs.aptitude.controller');
var auth = require('../../../auth');

var router = express.Router();
router.get('/', controller.index);

//router.use(auth.isAuthenticated());

router.get('/:id', controller.fetch);
//router.post('/', controller.create);
router.get('/stat/all',controller.getAllStatistics);
router.get('/stat/rank/:id',controller.getRankStatistics);
router.get('/stat/:id',controller.getStatistics);
router.put('/:id', controller.update);
router.get('/leaderboard/:id', controller.leaderBoard);
//router.patch('/:testId/:id', controller.patch);
//router.delete('/:id', controller.destroy);

module.exports = router;
