/**
 * Created by Vikash on 28/03/16.
 */

'use strict';

angular.module('etestApp')
  .controller('TCSAptitudeController', function ($scope, $location, $mdDialog, $mdMedia, $log, User, Auth, TCSAptitudeService, UtilityService, store) {
    var vm = this;
    vm.tests = [];
    (function () {
      if (store.get("tcsAptitudeAllTests") && store.get("tcsAptitudeAllTests").length) {
        vm.tests = store.get("tcsAptitudeAllTests")
      }
      load()
    })();

    function load() {
      TCSAptitudeService.getTests()
        .success(function (data) {
          $log.info(data);
          vm.tests = data;
        }).error(function (err, code) {
        $log.error(err);
        if (code >= 500) {
          load();
        }
      });
    }

    vm.start = function (ev, id) {
      //$location.path('/exam/tcs/verbal/1')
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
      $mdDialog.show({
          controller: vm.controller,
          templateUrl: 'app/exam/aptitude/tcs/tcs.aptitude.instructions.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          fullscreen: useFullScreen
        })
        .then(function (answer) {
          $location.path('/exam/tcs/aptitude/' + id)
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
          instruction: 'To navigate to any question, click the question number on the side bar at the top of the screen.'
        }, {
          icon: 'fa fa-hand-o-right',
          instruction: 'To answer a question, choose any one of the options provided and click <b class="success">Submit Answer</b>.'
        }, {
          icon: 'fa fa-hand-o-right',
          instruction: 'To clear a chosen answer, click <b class="md-warn">Reset</b>.'
        }, {
          icon: 'fa fa-hand-o-right',
          instruction: 'In case you wish to come back to a specific answer for review, select the answer, click <b class="">Mark for Review</b> check box and submit the answer. Questions marked for review will be indicated differently on the side bar till the time you come back to the question and thus help in quick navigation.'
        }, {
          icon: 'fa fa-hand-o-right',
          instruction: 'To skip a question you do not wish to attempt at all or attempt later, click <b class="info">Skip this Question</b>. If you select an answer option and skip a question, the answer will not be saved.'
        }, {
          icon: 'fa fa-hand-o-right',
          instruction: 'An online scientific calculator has been provided on the test screen for your use. Note that use of any other calculator is not permitted.'
        }, {
          icon: 'fa fa-hand-o-right',
          instruction: 'To exit the test, click <b class="success">Submit</b>. You will be automatically logged out of the test after 80 minutes. All answers submitted by you (including those that are Marked for Review) will be considered as the final answers.'
        }, {
          icon: 'fa fa-hand-o-right',
          instruction: 'All questions, except the ones that are marked as <i class="fa fa-star text-primary success "></i>,carry equal marks'
        }, {
          icon: 'fa fa-hand-o-right',
          instruction: '<i class="fa fa-star success"></i> questions carry higher marks than the rest. All <i class="fa fa-star text-primary success"></i>questions carry equal marks.'
        }, {
          icon: 'fa fa-hand-o-right',
          instruction: ' <i class="fa fa-hand-o-right"></i> The legend on the screen indicates the following:',
          secondary: [
            '<span class="text-success answered"><i class="fa fa-square"></i>Answered </span>&nbsp;&nbsp;',
            '<span class="text-warning mfr"><i class="fa fa-square"></i>Answered and Marked for Review </span>&nbsp;&nbsp;',
            '<span class="success"><i class="fa fa-star"> Carries higher marks</i></span>'
          ]
        }
      ];
    }];
    vm.colors = ['blue', 'purple', 'deepBlue', 'lightPurple', 'pink', 'green', 'deepBlue', 'red'];
    UtilityService.generateMeta({
      description: aptitudeKeywords.join(", "),
      title: "etest | TCS Analytical Ability Test Online",
      keywords: aptitudeKeywords.join(", "),
    });
  });
