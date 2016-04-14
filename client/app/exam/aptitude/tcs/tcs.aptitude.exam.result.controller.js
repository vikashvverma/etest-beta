'use strict';

angular.module('etestApp')
  .controller('TCSAptitudeExamResultController', function ($scope, $stateParams, $timeout, $location, $log, $interval, $sce, $mdDialog, User, Auth, TCSAptitudeService) {
    var vm = this;
    vm.id = $stateParams.id;
    vm.seriesType = 'spline';
    vm.resultType = 'column';
    vm.rankType = 'spline';
    if (!vm.id || TCSAptitudeService.getTestId() != vm.id) {
      return $location.path('/exam/tcs/aptitude/' + (vm.id > 0 ? vm.id : ""));
    } else {
      TCSAptitudeService.setTestId();
      TCSAptitudeService.getTestResult(vm.id);
      vm.test = TCSAptitudeService.getQuestions();
      vm._id = '';//test result id used to patch the test result aafiter spell check
      vm.score = TCSAptitudeService.getScore();
      vm.correct = vm.test.filter(function (question) {
        return question.ans == question.answer;
      });
      vm.incorrect = vm.test.filter(function (question) {
        return question.ans > 0 && question.ans != question.answer;
      });
      vm.type = 'pie';
      vm.notattempted = vm.test.length - vm.correct.length - vm.incorrect.length;
      vm.solutionData = [{
        name: 'Correct',
        y: vm.correct.length
      }, {
        name: 'Incorrect',
        y: vm.incorrect.length
      }, {
        name: 'Not Attempted',
        y: vm.notattempted
      }];


      /*TCSAptitudeService.updateTest(vm.id,vm.result)
       .success(function(data){
       $log.info(data);
       vm._id=data._id;
       vm.getGraphData();
       }).error(function(err){
       vm.getGraphData();
       });*/

      TCSAptitudeService.getStatistics(vm.id, Auth.getCurrentUser().user_id)
        .success(function (data) {
          vm.resultData = data;
        });
      TCSAptitudeService.getAllStatistics(Auth.getCurrentUser().user_id)
        .success(function (data) {
          vm.seriesData = data;
        });
      TCSAptitudeService.getRankStatistics(vm.id, Auth.getCurrentUser().user_id)
        .success(function (data) {
          vm.rankData = data;
        });

      TCSAptitudeService.getLeaderBoard(vm.id).success(function (data) {
        vm.leaderboard = data;
      });
      for (var i = 0; i < vm.test.length; i++) {
        $scope.$watch('vm.test[' + i + ']', function (newQuestion, oldQuestion) {
          if (newQuestion.rating > 0) {
            TCSAptitudeService.rate(newQuestion.id, newQuestion.rating).success(function (data) {
              TCSAptitudeService.notify("Your rating got question " + newQuestion.index + " is " + data.rating);
            });
          }
        }, true);
      }
    }


  });
