'use strict';

angular.module('etestApp')
  .controller('TCSVerbalPlacementController', function ($scope, $log, User, Auth, TCSVerbalService, UtilityService) {
    var vm = this;
    UtilityService.generateMeta({
      description: "TCS Verbal Question with answers, TCS Email questions and answers, TCS latest verbal question" + verbalKeywords.join(", "),
      title: "etest | TCS Verbal Ability Test Latest Questions with Answer",
      keywords: verbalKeywords.join(", "),
    });
    (function () {
      TCSVerbalService.getTests()
        .success(function (data) {
          vm.sets = data.reverse();
        }).error(function (err) {
        $log.error(err);
      })
    })();
    vm.share = UtilityService.share;

  });
