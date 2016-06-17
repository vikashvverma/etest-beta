'use strict';

angular.module('etestApp')
  .controller('TCSAptitudeExamResultController', function ($scope, $stateParams, $timeout, $location, $log, $interval, $sce, $mdDialog, User, Auth, TCSAptitudeService) {
    var vm = this;
    vm.id = $stateParams.id;
    vm.seriesType = 'spline';
    vm.resultType = 'column';
    vm.theme1 = 'Default';
    vm.theme2 = 'Default';
    vm.theme3 = 'Default';
    vm.rankType = 'spline';
    if (!vm.id || TCSAptitudeService.getTestId() != vm.id) {
      return $location.path('/exam/tcs/aptitude/' + (vm.id > 0 ? vm.id : ""));
    } else {
      TCSAptitudeService.setTestId();
      TCSAptitudeService.getTestResult(vm.id);
      vm.test = TCSAptitudeService.getQuestions();
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

      vm.viewProfile = function (ev, user) {
        var name = (user.name.indexOf('@') > 0 ? user.name.split('@')[0] : user.name);
        var id = user.userId;
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
          .title(name)
          .textContent('Would you like to view ' + name + '\'s profile?')
          .ariaLabel('view profile')
          .targetEvent(ev)
          .ok('Yes, please!')
          .cancel('Don\'t show!');
        $mdDialog.show(confirm).then(function () {
          $location.path('profile/' + id);
        }, function () {
        });
      };


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
        vm.leaderboard.map(function (user) {
          Auth.userPicture(user.userId).success(function(data){
            user.picture = data.picture;
          });
        });
      });
      for (var i = 0; i < vm.test.length; i++) {
        save(i);
      }

    }
    function save(index) {
      $scope.$watch('vm.test[' + index + ']', function (newQuestion, oldQuestion) {
        if (newQuestion.rating > 1) {
          TCSAptitudeService.rate(newQuestion.id, newQuestion.rating).success(function (data) {
            TCSAptitudeService.notify("Your rated question" + (index + 1) + ": " + data.rating);
          });
        }
      }, true);
    }
  });
