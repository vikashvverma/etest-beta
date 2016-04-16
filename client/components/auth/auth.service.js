'use strict';

angular.module('etestApp')
  .factory('Auth', function Auth($location, $rootScope, $http, $q, User, $cookieStore, store, auth) {
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
      },
      /**
       * Get user
       */
      getUser: function (id) {
        return $http.get('https://programminggeek.auth0.com/api/v2/users/' + id + '?fields=nickname,picture,name&include_fields=true', {
            headers: {
              'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJGRnlDajFpbHhyU0ROS2hJU1B0UDUxaU1XVDJ5REluNiIsInNjb3BlcyI6eyJ1c2VycyI6eyJhY3Rpb25zIjpbInJlYWQiXX19LCJpYXQiOjE0NjA4MjY1NTQsImp0aSI6ImVmZjYyZjExYjdlZjQ3YjYyMTk3ZWUyOTJiMzQyMDY0In0.ljmBWkOekRlYYFMhV4KPBR9zlOhcKmsNh7yulkmFApg'
            }
          })
          .success(function (data) {
            console.log(data);
            $q.resolve(data);
          }).error(function (err) {
            console.log(err);
            $q.reject(err);
          });
      }
    };
  });
