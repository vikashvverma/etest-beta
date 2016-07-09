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
    });
  });
