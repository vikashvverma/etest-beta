'use strict';

angular.module('etestApp')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$http', 'Auth', 'UtilityService',
    function ($rootScope, $scope, $http, Auth, UtilityService) {
      if (Auth.isLoggedIn()) {
        $rootScope.back();
      }
      var vm = this;
      vm.user = {};
      vm.errors = {};

      vm.login = function () {
        Auth.login();
      };
      UtilityService.generateMeta({
        description: "Login into etest:Programming Geek and Take Online TCS Verbal/Analytical Ability Test - Take online TCS Verbal and analytical ability test and improve your performance.",
        title: "etest | Login into Programming Geek"
      });
    }]);
