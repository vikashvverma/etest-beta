'use strict';

angular.module('etestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.placement', {
        url: 'placement',
        templateUrl: 'app/placement/placement.html',
        controller: 'PlacementController as vm'
      }).state('main.tcsverbalplacement', {
      url: 'placement/verbal/tcs',
      templateUrl: 'app/placement/verbal/tcs/verbal.html',
      controller: 'TCSVerbalPlacementController as vm'
    }).state('main.tcsverbalplacementsolution', {
      url: 'placement/verbal/tcs/:id',
      templateUrl: 'app/placement/verbal/tcs/verbal.answer.html',
      controller: 'TCSVerbalAnswerController as vm'
    }).state('main.interviewquestions', {
      url: 'placement/interview/question',
      templateUrl: 'app/placement/interview/interview.question.html',
      controller: 'InterviewQuestionAnswerController as vm'
    }).state('main.tcsaptitudequestions', {
      url: 'placement/aptitude/tcs/questions',
      templateUrl: 'app/placement/aptitude/tcs/question.html',
      controller: 'TCSAptitudeQuestionController as vm'
    }).state('main.tcsaptitudequestionanswer', {
      url: 'placement/aptitude/tcs/question/:id',
      templateUrl: 'app/placement/aptitude/tcs/question.answer.html',
      controller: 'TCSAptitudeQuestionAnswerController as vm'
    });
  });
