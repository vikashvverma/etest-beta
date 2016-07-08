/**
 * Created by Vikash on 25/03/16.
 */
'use strict';

angular.module('etestApp')
  .controller('AptitudeController', function ($scope, User, Auth, UtilityService) {
    var vm = this;
    vm.tests = [
      {
        image: 'assets/images/tcs_logo_stacked.png',
        title: 'TCS Analytical Ability Tests',
        content: 'Take TCS Analytical Ability test',
        link: 'main.tcsaptitude'
      },
      {
        image: 'assets/images/ibm_logo.png',
        title: 'IBM Aptitude Test',
        content: 'Coming Soon',
        link: 'main.aptitude'
      },
      {
        image: 'assets/images/mu-sigma.jpg',
        title: 'Mu Apt',
        content: 'Coming Soon',
        link: 'main.aptitude'
      }
    ];
    UtilityService.generateMeta({
      description: aptitudeKeywords.join(", "),
      title: "etest | TCS Analytical Ability Test Online",
      keywords: aptitudeKeywords.join(", "),
    });
  });
