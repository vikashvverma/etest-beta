'use strict';

angular.module('etestApp')
  .controller('ProfileController', ['$scope', '$stateParams', '$location', 'Auth', 'ngNotify',
    function ($scope, $stateParams, $location, Auth, ngNotify) {
      var vm = this;
      vm.user_id = $stateParams.id;
      vm.user = {
        user_id: vm.user_id
      };
      if (vm.user_id) {
        Auth.getUser(vm.user_id)
          .success(function (data) {
            vm.user.profile = data;
          })
          .error(function (err) {
            ngNotify.set("We are unable to load user profile!", 'error');
            //TODO: Show 404 page
            $location.path('/')
          })
      } else {
        $location.path('/')
      }
    }
  ]);
