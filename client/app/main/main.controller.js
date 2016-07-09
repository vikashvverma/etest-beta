'use strict';

angular.module('etestApp')
  .controller('MainCtrl', function ($rootScope, $scope, $location, $mdSidenav, $timeout, $window, $sce, Auth, UtilityService) {
    var vm = this;

    //$rootScope.commentbox={
    //  url:$location.absUrl(),
    //  width:$window.innerWidth-40,
    //  height:300,
    //  show:$location.path()=='/'?false:true
    //};
    //$rootScope.$on('$stateChangeStart', function (event, next) {
    //  if(next.url=='/'){
    //    $rootScope.commentbox.show=false;
    //  }else{
    //    $rootScope.commentbox.show=true;
    //  }
    //});
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

    UtilityService.generateMeta({});
  });
