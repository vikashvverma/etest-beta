'use strict';

angular.module('etestApp')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$http', 'Auth',
    function ($rootScope, $scope, $http, Auth) {
      if (Auth.isLoggedIn()) {
        $rootScope.back();
      }
      var vm = this;
      vm.user = {};
      vm.errors = {};

      vm.login = function () {
        Auth.login();
      }
    }]);
