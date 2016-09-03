'use strict';

angular.module('etestApp')
  .controller('PlacementController', function ($rootScope, $scope, UtilityService) {
    var vm = this;
    vm.sets = [
      [
        {
          title: "TCS Verbal Ability Test",
          name: "TCS Verbal Ability Test",
          subtitle: "Check out previous years' TCS email questions",
          icon: "pg-logo.png",
          image: 'assets/images/tcs_logo_stacked.png',
          description: "TCS Verbal Ability Test is compulsory for all students appearing for TCS Campus recruitment. Students often take TCS Verbal Ability Test lightly and sometimes they end up with no offer.",
          url: "http://etest.programminggeek.in/placement/tcs/verbal",
          primaryTitle: 'Take Test',
          srefPrimary: "main.tcsverbal",
          srefSecondary: "main.tcsverbalplacement"
        },
        {
          title: "TCS Analytical Ability Test",
          name: "TCS Analytical Ability Test",
          subtitle: "Check out previous years' TCS Analytical Ability questions",
          icon: "pg-logo.png",
          image: 'assets/images/tcs_logo_stacked.png',
          description: "TCS Analytical Ability Test gives you comprehensive idea of the questions asked in TCS Selection Process. Analytical Ability Test is part of the any campus recruitment exam. Take TCS analytical ability test now and analyze your performance.",
          url: "http://etest.programminggeek.in/placement/tcs/verbal",
          primaryTitle: 'Take Test',
          srefPrimary: "main.tcsaptitude",
          srefSecondary: "main.tcsaptitudeplacement"
        },
        {
          title: "Top interview questions and how to answer",
          name: "Top interview questions and how to answer",
          subtitle: "Know how to answer different interview questions!",
          icon: "pg-logo.png",
          image: 'assets/images/interview-questions-programming-geek.jpeg',
          description: "I still remember the day I was appearing for my first interview. Nervous,sweating, a bit hurried to answer the questions. Still remember the moment when I answered Lahore as Pakistan's capital.",
          url: "http://etest.programminggeek.in/placement/tcs/verbal",
          primaryTitle: 'See more!',
          srefPrimary: "main.interviewquestions",
        }
      ]
    ];
    UtilityService.generateMeta({
      description: "TCS Placement Papers, TCS Placement Papers with Solutions, TCS Placement Procedure, TCS Placement Process, TCS Placement 2016, TCS Placement Papers pdf, Placement Preparation Books, Placement Preparation Websites, Placement Preparation for CSE",
      title: "etest | TCS Latest Placement Papers 2016",
      keywords: "Placement, Placement Preparation, TCS Placement Papers, TCS Placement Papers with Solutions, TCS Placement Procedure, TCS Placement Process, TCS Placement 2016, TCS Placement Papers pdf, Placement Preparation Books, Placement Preparation Websites, Placement Preparation for CSE",
    });
    vm.share = UtilityService.share;
  });
