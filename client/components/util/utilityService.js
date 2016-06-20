'use strict';

angular.module('etestApp')
  .factory('UtilityService', function Auth($location, $rootScope, $http) {
    return {
      notifications: function () {
        return $http.get('/notifications.json');
      },
      notify: function (notifications) {
        if (!Notification) {
          return;
        }

        if (Notification.permission !== "granted")
          Notification.requestPermission();
        else {
          notifications.map(function (n) {
            var notification = new Notification(n.title && 'Programming Geek', {
              icon: 'http://etest.programminggeek.in/pg-logo.png',
              body: n.body
            });
            notification.onclick = function () {
              window.open(n.url);
            };
          });

        }
      }
    };


  });
