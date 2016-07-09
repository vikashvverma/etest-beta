'use strict';

angular.module('etestApp')
  .controller('TCSAptitudePlacementController', function ($scope, $log, User, Auth, TCSAptitudeService, UtilityService) {
    var vm = this;
    UtilityService.generateMeta({
      description: "TCS Aptitude Question with answers, TCS Email questions and answers, TCS latest verbal question" + aptitudeKeywords.join(", "),
      title: "etest | TCS Aptitude Ability Test Latest Questions with Answer",
      keywords: aptitudeKeywords.join(", "),
    });
    (function () {
      TCSAptitudeService.getTests()
        .success(function (data) {
          vm.sets = data.reverse();
        }).error(function (err) {
        $log.error(err);
      })
    })();
    vm.share = UtilityService.share;

  });
