'use strict';

angular.module('etestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.login', {
        url: 'login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl as vm'
      })
      .state('main.signup', {
        url: 'signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl as vm'
      })
      .state('main.settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .state('main.profile', {
        url: 'profile/:id',
        templateUrl: 'app/account/profile/profile.html',
        controller: 'ProfileController as vm',
        authenticate: false
      });
  });
