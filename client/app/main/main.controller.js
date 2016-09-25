'use strict';

angular.module('etestApp')
  .controller('MainCtrl', function ($rootScope, $scope, $location, $interval, $mdSidenav, $timeout, $window, $sce, Auth, UtilityService) {
    var vm = this;

    vm.features = [{
      image: 'assets/images/etest-feature1.png',
      class: 'md-primary',
      title: 'Huge Collection of Exam Papers',
      content: 'A collection of TCS Verbal Ability Test questions asked previously. Many of these questions have been repeated.'
    }, {
      image: 'assets/images/etest-feature2.png',
      class: 'md-accent',
      title: 'Exactly Similar Exam Environment',
      content: 'Each test environment resembles to actual test environment. The mock test help you get prepared for actual examination with ease.'
    }, {
      image: 'assets/images/etest-feature3.png',
      class: 'md-warn',
      title: 'Performance Analysis & Personalized Report',
      content: 'Each test has separate personalized report. It gives you personalized report and tips on how to improve. You can compare your performance in different tests as well as among students who has taken the test so far.'
    }, {
      image: 'assets/images/etest-feature4.png',
      class: 'md-primary',
      title: 'Performance Analysis & Personalized Report',
      content: 'Each test has separate personalized report. It gives you personalized report and tips on how to improve. You can compare your performance in different tests as well as among students who has taken the test so far.'
    }, {
      image: 'assets/images/etest-feature5.png',
      class: 'md-accent',
      title: 'Public Leaderboard',
      content: 'Check out public leaderboard and see who stands where. Try out navigate icon and see user\'s profile and test history.'
    }, {
      image: 'assets/images/etest-feature6.png',
      class: 'md-warn',
      title: 'Placement Assistant',
      content: 'Placement assistant helps you to prepare for placement. It helps you prepare for Verbal, Analytical & Interview. Check out a huge collection of verbal/analytical/interview question/answer.'
    }];
    vm.testimonials =[
      {
        says: "Sir I have practiced your email writing. It's very helpful to me. Thanks for providing us with such practice sessions.",
        user: "Iman Kalyan Mandal",
        picture: "https://lh5.googleusercontent.com/-m2H3D_7C1MU/AAAAAAAAAAI/AAAAAAAAABQ/uV_JVFrddZ0/photo.jpg",
      },{
        says: "This website helped me  last year when I was preparing for my placements. So, I thought to pass it on to my juniors so that they would be benefited. Anyways Thanks for such a good website.",
        user: "Irfan Sha",
        picture: "https://lh3.googleusercontent.com/-VQJklWJ7bAg/AAAAAAAAAAI/AAAAAAAAAAA/APaXHhT_RZVAtxwmL_BrIfC0LJSyht7ixg/s120-p-rw-no-mo/photo.jpg",
      },{
        says: "Dear sir,<br/>I would like to tell you that your website Programming geek and your TCS Verbal Test simulator are very useful tool for the person preparing for the interview of the TCS.<br/>I have practiced various sets of both analytical and verbal test.It was so helpful and finaly I got placed in TCS.<br/>Greetings to you!!!!",
        user: "Aman Yadav",
        picture: "https://lh3.googleusercontent.com/-6AuYoP-Mcjg/AAAAAAAAAAI/AAAAAAAAAKw/Z5t1LhLUg24/photo.jpg",
      }
    ];
    vm.testimonial= vm.testimonials[0];

    vm.currentTestimonial=0;
    $scope.$watch("vm.currentTestimonial", function (newValue, oldValue) {
      vm.testimonial = vm.testimonials[newValue];
    });

    vm.nextTestimonial=function(next) {
      vm.currentTestimonial = next % vm.testimonials.length;
    };
    vm.previousTestimonial=function(previous) {
      vm.currentTestimonial = previous < 0 ? vm.testimonials.length - 1 : previous;
    };
    vm.current = 0;
    $scope.$watch("vm.current", function (newValue, oldValue) {
      vm.feature = vm.features[newValue];
    });
    $scope.$watch('vm.testimonial', function (newValue, oldValue) {
      if (newValue === oldValue) return;
      // TODO: Show swipe animation
      //$('.testimonial .testimonial-container').hide();
      //$('.testimonial .testimonial-container').fadeIn("slow", function () {
      //});
      //$('.testimonial .testimonial-container').hide();
      //$('.testimonial .testimonial-container').fadeIn("slow", function () {
      //});
    });

    $scope.$watch('vm.feature.image', function (newValue, oldValue) {
      if (newValue === oldValue) return;
      //$('img#etest-feature-image').animate({opacity:'0'});
      //$('img#etest-feature-image').animate({opacity:'1'});
      $('img#etest-feature-image').hide();
      $('img#etest-feature-image').fadeIn("slow", function () {
      });

      //$('.etest-feature-content').animate({opacity:'0'});
      //$('.etest-feature-content').animate({opacity:'1'});
      $('.etest-feature-content').hide();
      $('.etest-feature-content').fadeIn("slow", function () {
      });
    });

    try {
      $timeout(function () {
        FB.XFBML.parse($('#commentbox')[0]);
      }, 0);
    } catch (msg) {
    }
    vm.isLoggedIn = Auth.isLoggedIn;
    vm.isAdmin = Auth.isAdmin;
    vm.user = Auth.getCurrentUser();
    vm.getCurrentUser = Auth.getCurrentUser;
    vm.years = [];
    vm.branches = [];
    vm.defaultAvatar = 'assets/images/avatar_2x.png';

    $rootScope.$on('$locationChangeSuccess', function () {
      vm.isLoggedIn = Auth.isLoggedIn;
      vm.isAdmin = Auth.isAdmin;
      vm.user = Auth.getCurrentUser();
      vm.getCurrentUser = Auth.getCurrentUser;
    });

    vm.logout = function () {
      Auth.logout();
    };
    vm.toggleSidenav = function (menuId) {
      $mdSidenav(menuId).toggle();
    };
    vm.share = UtilityService.share;
    vm.blogs = [{
      heading: 'Popular Tests',
      items: [{
        image: 'assets/images/tcs_logo_stacked.png',
        title: 'TCS Verbal Test',
        content: 'Take online TCS verbal ability test and analyze your performance',
        url: "http://etest.programminggeek.in/exam/tcs/verbal",
        sref: 'main.tcsverbal',
        isOpen: false
      }, {
        image: 'assets/images/tcs_logo_stacked.png',
        title: 'TCS Verbal Test Chrome App',
        content: 'Download our Chrome App from and take TCS Verbal ability test offline.',
        url: "https://chrome.google.com/webstore/detail/tcs-verbal-test-simulator/mldfkmkaobhdebanldjiiaancjmflpcc",
        isOpen: false
      }, {
        image: 'assets/images/tcs_logo_stacked.png',
        title: 'TCS Analytical Ability Test',
        content: 'Take TCS Analytical Ability Test, analyze and improve your performance.',
        url: "http://etest.programminggeek.in/exam/tcs/aptitude",
        isOpen: false
      }]
    }];

    vm.open = function (url) {
      $window.open(url, '_blank').focus();
    };
    vm.mainMenu = [
      {
        icon: "fa fa-unlock fa-2x",
        title: "Verbal",
        tooltip: "Verbal Test",
        url: 'main.verbal'
      },
      {
        icon: "fa fa-unlock fa-2x",
        title: "Aptitude",
        tooltip: "Aptitude Test",
        url: 'main.aptitude'
      },
      {
        icon: "fa fa-unlock fa-2x",
        title: "Leaderboard",
        tooltip: "Leader Board",
        url: 'main.leaderboard'
      },
      {
        icon: "fa fa-unlock fa-2x",
        title: "Placement",
        tooltip: "Placement",
        url: 'main.placement'
      },
      {
        icon: "fa fa-lock fa-2x",
        title: "Testimonial",
        tooltip: "Testimonial",
        url: 'main.testimonial'
      }
    ];
    vm.extraMenu = [{
      icon: "fa fa-info-circle ",
      title: "About",
      tooltip: "About Us",
      url: 'main.aboutus'
    }, {
      icon: "fa fa-envelope ",
      title: "Contact us",
      tooltip: "Contact Us",
      url: 'main.contactus'
    }
    ];

    vm.userMenu = [
      //{
      //  link : '',
      //  title: 'Dashboard',
      //  icon: 'fa fa-lock fa-2x'
      //},
      //{
      //  link : '',
      //  title: 'Friends',
      //  icon: 'fa fa-lock fa-2x'
      //},
      //{
      //  link : '',
      //  title: 'Messages',
      //  icon: 'fa fa-lock fa-2x'
      //}
    ];
    vm.people = [
      {name: 'Janet Perkins', img: 'assets/images/100-0.jpeg', newMessage: true},
      {name: 'Mary Johnson', img: 'assets/images/100-1.jpeg', newMessage: false},
      {name: 'Peter Carlsson', img: 'assets/images/100-2.jpeg', newMessage: false}
    ];

    var stop;
    vm.startFeatureSlide = function () {
      stop = $interval(function () {
        vm.current = (vm.current + 1) % vm.features.length;
        vm.currentTestimonial = (vm.currentTestimonial+1)  % vm.testimonials.length;
      }, 5000);
    };
    vm.stopFeatureSlide = function () {
      $interval.cancel(stop);
    };
    $scope.$on('$destroy', function () {
      vm.stopFeatureSlide();
    });
    vm.startFeatureSlide();
    UtilityService.generateMeta({});
  });
