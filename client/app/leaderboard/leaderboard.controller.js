'use strict';

angular.module('etestApp')
  .controller('LeaderboardController', function ($rootScope, $scope, $location, $timeout, $mdDialog, TCSVerbalService, TCSAptitudeService, Auth, UtilityService) {
    var vm = this;


    var loadTCSVerbals = function () {
      // Use timeout to simulate a 650ms request.
      return $timeout(function () {
        vm.leaderboards[0].tests = vm.leaderboards[0].tests || [
            {id: 1, name: 'Test 1'},
            {id: 2, name: 'Test 2'},
            {id: 3, name: 'Test 3'},
            {id: 4, name: 'Test 4'},
            {id: 5, name: 'Test 5'},
            {id: 6, name: 'Test 6'},
            {id: 7, name: 'Test 7'},
            {id: 8, name: 'Test 8'},
            {id: 9, name: 'Test 9'},
            {id: 10, name: 'Test 10'},
            {id: 11, name: 'Test 11'},
            {id: 12, name: 'Test 12'},
            {id: 13, name: 'Test 13'},
            {id: 14, name: 'Test 14'},
            {id: 15, name: 'Test 15'},
            {id: 16, name: 'Test 16'},
            {id: 17, name: 'Test 17'},
            {id: 18, name: 'Test 18'},
            {id: 19, name: 'Test 19'},
            {id: 20, name: 'Test 20'},
            {id: 21, name: 'Test 21'},
            {id: 22, name: 'Test 22'},
          ];
      }, 650);
    };
    var loadTCSAptitudes = function () {
      console.log("Hey");
      // Use timeout to simulate a 650ms request.
      return $timeout(function () {
        vm.leaderboards[1].tests = vm.leaderboards[1].tests || [
            {id: 1, name: 'Test 1'},
            {id: 2, name: 'Test 2'},
            {id: 3, name: 'Test 3'},
            {id: 4, name: 'Test 4'},
            {id: 5, name: 'Test 5'},
            {id: 6, name: 'Test 6'},
            {id: 7, name: 'Test 7'},
            {id: 8, name: 'Test 8'},
            {id: 9, name: 'Test 9'},
            {id: 10, name: 'Test 10'}
          ];
      }, 650);
    };
    vm.leaderboards = [
      {
        title: 'TCS Verbal Ability Test',
        isVerbal: true,
        content: "Your best score (at least 50) is considered for leaderboard!",
        load: loadTCSVerbals,
        type: 'verbal'
      },
      {
        title: 'TCS Analytical Ability Test',
        content: "Your best score is considered for leaderboard!",
        load: loadTCSAptitudes,
        type: 'aptitude'
      },
    ];
    vm.change = function (type, id) {
      vm[type + 'LeaderBoard'](id);
    };
    vm.verbalLeaderBoard = function (id) {
      TCSVerbalService.getLeaderBoard(id || 1).success(function (data) {
        vm.leaderboards[0].users = data;
        vm.leaderboards[0].users.map(function (user) {
          Auth.userPicture(user.userId).success(function (data) {
            user.picture = data.picture;
          });
        });
      });
    };
    vm.aptitudeLeaderBoard = function (id) {
      TCSAptitudeService.getLeaderBoard(id || 1).success(function (data) {
        vm.leaderboards[1].users = data;
        vm.leaderboards[1].users.map(function (user) {
          Auth.userPicture(user.userId).success(function (data) {
            user.picture = data.picture;
          });
        });
      });
    };
    vm.viewProfile = function (ev, user) {
      var name = (user.name.indexOf('@') > 0 ? user.name.split('@')[0] : user.name);
      var id = user.userId;
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .title(name)
        .textContent('Would you like to view ' + name + '\'s profile?')
        .ariaLabel('view profile')
        .targetEvent(ev)
        .ok('Yes, please!')
        .cancel('Don\'t show!');
      $mdDialog.show(confirm).then(function () {
        $location.path('profile/' + id);
      }, function () {
      });
    };

    vm.verbalLeaderBoard();
    vm.aptitudeLeaderBoard();
    UtilityService.generateMeta({
      description: "etest: See Verbal and Aptitude Tests' LeaderBoard. " + keywords.join(", "),
      title: "Leaderboard: Verbal and Aptitude Tests",
      keywords: "Leaderboard, Verbal Leaderboard, Aptitude Leaderboard, TCS Verbal Ability Test Leaderboard, TCS Analytical Ability Test Leaderboard, TCS Email Writing LeaderBoard, TCS Aptitude test Leaderboard, " + keywords.join(", ")
    });
  });
