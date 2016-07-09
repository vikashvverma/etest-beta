'use strict';

angular.module('etestApp')
  .controller('TCSAptitudeAnswerController', function ($scope, $log, $stateParams, $location, User, Auth, TCSAptitudeService, UtilityService) {
    var vm = this;
    var set = $stateParams.id;
    if (!set) {
      $location.path('/')
    }

    UtilityService.generateMeta({
      description: "TCS Aptitude Question with answers, TCS Email questions and answers, TCS latest verbal question" + aptitudeKeywords.join(", "),
      title: "etest | TCS Aptitude Ability Test Latest Questions with Answers",
      keywords: aptitudeKeywords.join(", "),
    });
    (function () {
      TCSAptitudeService.getTest(set)
        .success(function (data) {
          vm.test = TCSAptitudeService.get(data.id);
        })
        .error(function (err) {

        });
    })();
    vm.share = UtilityService.share;

  });
