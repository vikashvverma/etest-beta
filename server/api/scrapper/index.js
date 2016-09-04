'use strict';

var express = require('express');
var controller = require('./scrapper.controller');

var router = express.Router();
router.get('/fetchQuestions', controller.fetchQuestions);
router.post('/fetchSolution', controller.fetchSolution);
module.exports = router;
