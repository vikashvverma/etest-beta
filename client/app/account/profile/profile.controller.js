'use strict';

angular.module('etestApp')
  .controller('ProfileController', ['$scope', '$stateParams', '$location', '$mdDialog', 'Auth', 'ngNotify', 'TCSAptitudeService', 'TCSVerbalService',
    function ($scope, $stateParams, $location, $mdDialog, Auth, ngNotify, TCSAptitudeService, TCSVerbalService) {
      var vm = this;
      vm.user_id = $stateParams.id;
      vm.user = {
        user_id: vm.user_id
      };
      if (vm.user_id) {
        Auth.getUser(vm.user_id)
          .success(function (data) {
            vm.user.profile = data;
            vm.loadStatistics();
          })
          .error(function (err) {
            ngNotify.set("We are unable to load user profile!", 'error');
            //TODO: Show 404 page
            $location.path('/')
          });

        vm.loadStatistics = function () {
          TCSAptitudeService.getAllStatistics(vm.user.profile.user_id)
            .success(function (data) {
              vm.user.aptitude = vm.user.aptitude ? vm.user.aptitude : {};
              vm.user.aptitude.seriesData = data;
              //TODO: Prevents scroll
              //vm.user.aptitude.seriesType = 'spline';
              vm.user.aptitude.testsTaken = vm.user.aptitude.seriesData.filter(function (test) {
                return test.data.length > 1;
              }).length;
              var count = 0;
              vm.user.aptitude.seriesData.map(function (test) {
                //INFO: -1 because first value is undefined, so that graph starts from 1 instead of 0
                count += test.data.length - 1;
              });
              vm.user.aptitude.testsCount = count;
            });
          TCSVerbalService.getAllStatistics(vm.user.profile.user_id)
            .success(function (data) {
              vm.user.verbal = vm.user.verbal ? vm.user.verbal : {};
              vm.user.verbal.seriesData = data;
              //TODO: Prevents scroll
              //vm.user.verbal.seriesType = 'spline';
              vm.user.verbal.testsTaken = vm.user.verbal.seriesData.filter(function (test) {
                return test.data.length > 1;
              }).length;
              var count = 0;
              vm.user.verbal.seriesData.map(function (test) {
                //INFO: -1 because first value is undefined, so that graph starts from 1 instead of 0
                count += test.data.length - 1;
              });
              vm.user.verbal.testsCount = count;
            });
        };
        vm.visit = function (social) {
          var found = false;
          vm.user.profile.identities.map(function (identity) {
            if (identity.provider.indexOf(social) >= 0) {
              found = true;
              var url = vm.providers[social] ? vm.providers[social] + identity.user_id : vm.user.profile.link;
              var win = window.open(url, '_blank');
              win.focus();
            }
          });
          if (!found) {
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('body')))
                .clickOutsideToClose(true)
                .title(social.toUpperCase())
                .textContent(vm.user.profile.nickname + ' has not linked ' + social + ' account!')
                .ariaLabel('social account not found!')
                .ok('Got it!')
                .targetEvent(undefined)
            );
          }
        };
      } else {
        $location.path('/')
      }
      vm.providers = {
        //Facebook: not required (present as 'link' property)
        'google': 'https://plus.google.com/',
        'twitter': 'https://twitter.com/intent/user?user_id='
      };
    }
  ]);
