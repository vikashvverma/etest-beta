'use strict';

angular.module('etestApp')
  .controller('TCSVerbalController', function ($scope, $location, $mdDialog, $mdMedia, $log, User, Auth, TCSVerbalService, UtilityService) {
    var vm = this;
    vm.sets = [];

    (function () {
      TCSVerbalService.getTests()
        .success(function (data) {
          $log.info(data);
          vm.sets = data;
        }).error(function (err) {
        $log.error(err);
      })
    })();

    vm.start = function (ev, id) {
      //$location.path('/exam/tcs/verbal/1')
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
      $mdDialog.show({
          controller: vm.controller,
          templateUrl: 'app/exam/verbal/tcs/instructionsDialog.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          fullscreen: useFullScreen
        })
        .then(function (answer) {
          $location.path('/exam/tcs/verbal/' + id)
        }, function () {
          //alert('You cancelled the dialog.');
        });
    };
    vm.controller = ['$scope', '$mdDialog', function ($scope, $mdDialog) {
      var vm = this;
      $scope.hide = function () {
        $mdDialog.hide();
      };
      $scope.cancel = function () {
        $mdDialog.cancel();
      };
      $scope.answer = function (answer) {
        $mdDialog.hide(answer);
      };
      $scope.instructions = [
        {
          icon: 'fa fa-hand-o-right',
          instruction: 'It is compulsory to use all the specific words mentioned in the Outline in your email. You can add other sentences of your choice, as appropriate'
        }, {
          icon: 'fa fa-hand-o-right',
          instruction: 'The name of the sender and receiver should be as given.'
        }, {
          icon: 'fa fa-hand-o-right',
          instruction: 'The email must contain a minimum of fifty words, or it will not be evaluated at all.'
        }, {
          icon: 'fa fa-hand-o-right',
          instruction: 'If the outline is not strictly followed (including the speific words used), or correct English (including spelling and grammar) is not used, the grade in this section will be poor.'
        }
      ];
    }];
    UtilityService.generateMeta({
      description: verbalKeywords.join(", "),
      title: "etest | TCS Verbal Ability Test Online",
      keywords: verbalKeywords.join(", "),
    });
  });
