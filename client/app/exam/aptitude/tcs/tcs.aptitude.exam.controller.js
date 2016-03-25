'use strict';

angular.module('etestApp')
  .controller('TCSAptitudeExamController', function ($scope, $stateParams, $location, $timeout, $interval, $sce, $mdDialog, User, Auth, TCSAptitudeService) {
    var vm = this;
    var id = $stateParams.id;
    vm.id = id;
    vm.answer = 0;
    vm.mfr = false;
    vm.currentQuestion = {};
    vm.test = {};
    if (!id) {
      $location.path('/')
    }
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
    (function () {
      //TCSVerbalService.resetTest();
      TCSAptitudeService.getTest(id)
        .success(function (data) {
          vm.questions = TCSAptitudeService.getQuestions();
          vm.test.time = {
            minute: 80,
            second: 0,
            seconds: 4800
          };
          vm.startTest();
          vm.currentQuestion = TCSAptitudeService.get(1);
          vm.answer = 0;
        })
        .error(function (err) {

        });
    })();

    vm.log = function () {
    };
    vm.getQuestions = function(){
      return TCSAptitudeService.getQuestions();
    };
    vm.startTest = function () {
      vm.startTime();
    };
    vm.startTime = function () {
      vm.interval = $interval(function () {
        vm.test.time.seconds -= 1;
        if (vm.test.time.seconds > 0) {
          vm.test.time.minute = parseInt(vm.test.time.seconds / 60);
          vm.test.time.second = vm.test.time.seconds % 60;
        } else {
          vm.endTime();
        }
      }, 1000);


    };
    vm.endTime = function () {
      $interval.cancel(vm.interval);
      vm.evaluateAnswer();
    };

    vm.next = function (current) {
      vm.currentQuestion = TCSAptitudeService.get(current + 1);
      vm.answer = vm.currentQuestion.selected;
      vm.mfr = vm.currentQuestion.mfr;
    };
    vm.previous = function (current) {
      vm.currentQuestion = TCSAptitudeService.get(current - 1);
      vm.answer = vm.currentQuestion.selected;
      vm.mfr = vm.currentQuestion.mfr;
    };
    vm.select = function (id) {
      vm.answer = id;
    };
    vm.markForReview = function () {
      if (vm.answer >= 1 && vm.answer <= 4) {
        vm.mfr = !vm.mfr;
      } else {
        console.log(vm.mfr);
        vm.mfr = false;
        TCSAptitudeService.notify("Select an option first!", "error");
      }
    };

    vm.reset = function () {
      vm.answer = 0;
      vm.mfr=false;
    };
    vm.submit = function () {
      console.log(vm.answer);
      TCSAptitudeService.submit(vm.currentQuestion.id, vm.mfr, vm.answer);
      vm.next(vm.currentQuestion.index);
    };
    vm.evaluateAnswer = function () {
      //alert('Test Ended!');
      $location.path('/exam/tcs/aptitude/' + id + '/result')
    };
    vm.endTest = function (ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .parent(angular.element(document.body))
        .title('Are you sure you want to end the test?')
        .content('Click on Yes to check your performance.')
        .ariaLabel('Finish')
        .ok('Yes')
        .cancel('No')
        .targetEvent(ev ? ev : null);
      $mdDialog.show(confirm).then(function () {
        vm.endTime();
      }, function () {

      });
    };
    $scope.$on('$destroy', function () {
      $interval.cancel(vm.interval);
    });
  });
