'use strict';

angular.module('etestApp')
  .controller('TCSVerbalPlacementController', function ($scope, $log, User, Auth, TCSVerbalService, UtilityService) {
    var vm = this;
    UtilityService.generateMeta({
      description: "TCS Email Writing Latest Questions with answer, TCS Email Writing, TCS Verbal Question with answers, TCS Email questions and answers, TCS latest verbal question" + verbalKeywords.join(", "),
      title: "etest | TCS Email Writing Latest Questions with Answer",
      keywords: verbalKeywords.join(", "),
    });
    (function () {
      TCSVerbalService.getTests()
        .success(function (data) {
          vm.sets = data;
        }).error(function (err) {
        $log.error(err);
      })
    })();
    vm.share = UtilityService.share;

  });
