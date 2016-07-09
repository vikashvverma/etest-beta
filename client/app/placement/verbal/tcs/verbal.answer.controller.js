'use strict';

angular.module('etestApp')
  .controller('TCSVerbalAnswerController', function ($scope, $log, $stateParams, $location, User, Auth, TCSVerbalService, UtilityService) {
    var vm = this;
    var set = $stateParams.id;
    if (!set) {
      $location.path('/')
    }

    UtilityService.generateMeta({
      description: "TCS Verbal Question with answers, TCS Email questions and answers, TCS latest verbal question" + verbalKeywords.join(", "),
      title: "etest | TCS Verbal Ability Test Latest Questions with Answers",
      keywords: verbalKeywords.join(", "),
    });
    (function () {
      TCSVerbalService.getTest(set)
        .success(function (data) {
          vm.test = TCSVerbalService.get(data.id);
        })
        .error(function (err) {

        });
    })();
    vm.share = UtilityService.share;

  });
