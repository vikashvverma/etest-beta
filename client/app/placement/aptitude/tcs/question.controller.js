'use strict';

angular.module('etestApp')
  .controller('TCSAptitudeQuestionController', function ($scope, $log, $location, User, Auth, TCSAptitudeService, UtilityService) {
    var vm = this;
    vm.logo = 'assets/images/tcs_logo.png';
    UtilityService.generateMeta({
      description: "TCS Aptitude Question with answers, TCS questions and answers, TCS latest Aptitude question" + aptitudeKeywords.join(", "),
      title: "etest | TCS Latest AnalyticalAbility Questions & Answers",
      keywords: aptitudeKeywords.join(", "),
    });
    vm.questions = [];
    var blocked = [155640];
    vm.pages = {
      30: 67,
      10: 200,
      20: 100,
    };
    vm.loading = true;
    vm.navigate = function ($event, index, id) {
      const question = vm.questions[index];
      TCSAptitudeService.setQuestion(question.question);
      $location.path('/placement/aptitude/tcs/question/' + question.id)
    };
    vm.get = function (page, count) {
      vm.loading = true;
      var backup = vm.questions;
      vm.questions = [];
      TCSAptitudeService.fetchQuestions(page, count ? count : 10)
        .success(function (data) {
          vm.questions = data.filter(function (question) {
            return blocked.indexOf(Number(question.id)) < 0;
          });
          vm.page = page;
          vm.loading = false;
        }).error(function (err) {
        vm.questions = backup;
        vm.loading = false;
        TCSAptitudeService.notify(err.message, 'error');
      })
    };
    (function () {
      vm.get(1, 10);
      vm.page = 1;
    })();
    vm.share = UtilityService.share;

  });
