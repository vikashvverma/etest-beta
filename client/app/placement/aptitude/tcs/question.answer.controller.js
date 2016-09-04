'use strict';

angular.module('etestApp')
  .controller('TCSAptitudeQuestionAnswerController', function ($scope, $stateParams, $location, $http, User, Auth, TCSAptitudeService, UtilityService) {
    var vm = this;
    var id = $stateParams.id;
    if (!id) {
      $location.path('/')
    }
    vm.question = TCSAptitudeService.getQuestion();
    (function () {
      TCSAptitudeService.fetchSolution(id)
        .success(function (data) {
          vm.answer = data;
        })
        .error(function (data) {
          TCSAptitudeService.notify(data.message, 'error');
        });
    })();
    vm.share = UtilityService.share;
    vm.logo = 'assets/images/tcs_logo.png';
    UtilityService.generateMeta({
      description: "TCS Aptitude Question with answers, TCS questions and answers, TCS latest Aptitude question" + aptitudeKeywords.join(", "),
      title: "etest | TCS Latest AnalyticalAbility Questions & Answers",
      keywords: aptitudeKeywords.join(", "),
    });
    vm.questions = [];

  });
