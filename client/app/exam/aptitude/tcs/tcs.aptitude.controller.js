/**
 * Created by Vikash on 28/03/16.
 */

'use strict';

angular.module('etestApp')
  .controller('TCSAptitudeController', function ($scope, $location, $mdDialog, $log, User, Auth, TCSAptitudeService) {
    var vm = this;
    vm.tests = [];
    (function () {
      TCSAptitudeService.getTests()
        .success(function (data) {
          $log.info(data);
          vm.tests = data;
        }).error(function (err) {
        $log.error(err);
      })
    })();

    vm.start = function (ev, id) {
      //$location.path('/exam/tcs/verbal/1')
      $mdDialog.show({
          controller: vm.controller,
          templateUrl: 'app/exam/aptitude/tcs/tcs.aptitude.instructions.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
        })
        .then(function (answer) {
          $location.path('/exam/tcs/aptitude/' + id)
        }, function () {
          //alert('You cancelled the dialog.');
        });
    };
    vm.controller = function ($scope, $mdDialog) {
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
          instruction: 'To answer a question, choose any one of the options provided and click <b>Submit Answer</b>.'
        }, {
          icon: 'fa fa-hand-o-right',
          instruction: 'To clear a chosen answer, click <b>Reset</b>.'
        }, {
          icon: 'fa fa-hand-o-right',
          instruction: 'In case you wish to come back to a specific answer for review, select the answer, click <b>Mark for Review</b> check box and submit the answer. Questions marked for review will be indicated differently on the side bar till the time you come back to the question and thus help in quick navigation.'
        }, {
          icon: 'fa fa-hand-o-right',
          instruction: 'To skip a question you do not wish to attempt at all or attempt later, click <b>Skip this Question</b>. If you select an answer option and skip a question, the answer will not be saved.'
        }
      ];
    };
    vm.colors = ['blue', 'purple', 'deepBlue', 'lightPurple', 'pink', 'green', 'deepBlue', 'red'];

  });
