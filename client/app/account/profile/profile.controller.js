'use strict';

angular.module('etestApp')
  .controller('ProfileController', ['$scope', '$stateParams', '$location', '$mdDialog', '$mdMedia', '$window', 'Auth', 'ngNotify', 'TCSAptitudeService', 'TCSVerbalService',
    function ($scope, $stateParams, $location, $mdDialog, $mdMedia, $window, Auth, ngNotify, TCSAptitudeService, TCSVerbalService) {
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
                .textContent((vm.user.profile.name.indexOf('@') > 0 ? vm.user.profile.nickname : vm.user.profile.name) + ' has not linked ' + social + ' account!')
                .ariaLabel('social account not found!')
                .ok('Got it!')
                .targetEvent(undefined)
            );
          }
        };
        vm.sharer = function (ev) {
          var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
          $mdDialog.show({
              controller: DialogController,
              templateUrl: 'app/account/profile/sharer.tmpl.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true,
              fullscreen: useFullScreen
            })
            .then(function () {
              //OK
            }, function () {
              //Cancel
            });
          $scope.$watch(function () {
            return $mdMedia('xs') || $mdMedia('sm');
          }, function (wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
          });
        };


      } else {
        $location.path('/')
      }
      vm.providers = {
        //Facebook: not required (present as 'link' property)
        'google': 'https://plus.google.com/',
        'twitter': 'https://twitter.com/intent/user?user_id='
      };
      function DialogController($scope, $mdDialog) {
        $scope.hide = function () {
          $mdDialog.hide();
        };
        $scope.cancel = function () {
          $mdDialog.cancel();
        };
        $scope.share = function (site, profile) {
          var sharing = {
            'facebook': function (profile) {
              $window.open('//www.facebook.com/share.php?m2w&s=100&p[url]=' + encodeURIComponent(profile.url) + '&p[images][0]=' + profile.picture + '&p[title]=etest(Programming Geek)&p[summary]=' + profile.description, 'Facebook', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
            },
            'twitter': function (profile) {
              $window.open('https://twitter.com/intent/tweet?original_referer=' + encodeURIComponent(profile.url) + '&text=' + encodeURIComponent(profile.description) + '%20' + encodeURIComponent(profile.url), 'Twitter', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
            },
            'google': function (profile) {
              $window.open('//plus.google.com/share?url=' + encodeURIComponent(profile.url), 'GooglePlus', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
            }
          };
          sharing[site]({
            url: $location.absUrl(),
            picture: vm.user.profile.picture,
            description: (vm.user.profile.name.indexOf('@') > 0 ? vm.user.profile.nickname : vm.user.profile.name) + ' profile on etest(Programming Geek)'
          });
          ;
        };
      }
    }
  ]);
