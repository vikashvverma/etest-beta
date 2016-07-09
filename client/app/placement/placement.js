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
    });
  });
