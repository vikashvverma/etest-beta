'use strict';

angular.module('etestApp')
  .factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore, store, auth) {
    var currentUser = {};
    if (store.get('profile')) {
      currentUser = store.get('profile');
    }
    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function (user, callback) {
        auth.signin({}, function (profile, token) {
          // Success callback
          currentUser = profile;
          store.set('profile', profile);
          store.set('token', token);
          $rootScope.back();
          //$location.path('/');
        }, function () {
          // Error callback
        });
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function () {
        auth.signout();
        store.remove('profile');
        store.remove('token');
        $location.path('/');
      },
      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function () {
        return currentUser;
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function () {
        return auth.isAuthenticated;
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function () {
        return currentUser.role === 'admin';
      },

      /**
       * Get auth token
       */
      getToken: function () {
        return $cookieStore.get('token');
      }
    };
  });
