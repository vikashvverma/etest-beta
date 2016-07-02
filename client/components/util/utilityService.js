'use strict';

angular.module('etestApp')
  .factory('UtilityService', function Auth($location, $rootScope, $http, store) {
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
          var done = store.get('notifications') || [];
          notifications.map(function (n) {
            if (done.indexOf(n.id) < 0) {
              var notification = new Notification(n.title && 'Programming Geek', {
                icon: 'http://etest.programminggeek.in/pg-logo.png',
                body: n.body
              });
              notification.onclick = function () {
                window.open(n.url);
              };
              done.push(n.id);
              store.set('notifications', done);
            }

          });

        }
      },
      generateMeta: function (meta) {
        $rootScope.meta = {
          description: meta.description || description,
          keywords: meta.keywords || keywords.join(", "),
          url: $location.absUrl() || url,
          image: meta.image || image,
          title: meta.title || title
        }
      }
    };


  });
