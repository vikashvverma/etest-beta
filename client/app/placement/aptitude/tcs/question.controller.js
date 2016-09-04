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
    vm.navigate = function ($event, index, id) {
      const question = vm.questions[index];
      TCSAptitudeService.setQuestion(question.question);
      $location.path('/placement/aptitude/tcs/question/' + question.id)
    };
    (function () {
      TCSAptitudeService.fetchQuestions(1, 10)
        .success(function (data) {
          vm.questions = data
        }).error(function (err) {
        TCSAptitudeService.notify(err.message, 'error');
      })
    })();
    vm.share = UtilityService.share;

  });
