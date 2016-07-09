'use strict';

angular.module('etestApp')
  .controller('TCSVerbalPlacementController', function ($scope, $log, User, Auth, TCSVerbalService, UtilityService) {
    var vm = this;
    UtilityService.generateMeta({
      description: verbalKeywords.join(", "),
      title: "etest | TCS Verbal Ability Test Latest Questions with Solution",
      keywords: verbalKeywords.join(", "),
    });
    (function () {
      TCSVerbalService.getTests()
        .success(function (data) {
          $log.info(data);
          vm.sets = data.reverse();
        }).error(function (err) {
        $log.error(err);
      })
    })();
    vm.share = UtilityService.share;

  });
