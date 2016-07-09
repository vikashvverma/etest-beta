'use strict';

angular.module('etestApp')
  .factory('UtilityService', function Auth($location, $rootScope, $http, $window, store) {
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
      },
      share: function (site, post) {
        var sharing = {
          'facebook': function (post) {
            $window.open('//www.facebook.com/share.php?m2w&s=100&p[url]=' + encodeURIComponent(post.url) + '&p[images][0]=' + encodeURIComponent(post.url) + '&p[title]=' + encodeURIComponent(post.name) + '&p[summary]=' + encodeURIComponent('Sharing via ProgrammingGeek... :)'), 'Facebook', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
          },
          'twitter': function (post) {
            $window.open('https://twitter.com/intent/tweet?original_referer=' + encodeURIComponent(post.url) + '&text=' + encodeURIComponent('via ProgrammingGeek... :)') + '%20' + encodeURIComponent(post.url), 'Twitter', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
          },
          'google': function (post) {
            $window.open('//plus.google.com/share?url=' + encodeURIComponent(post.url), 'GooglePlus', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
          }
        };
        sharing[site](post);
      }
    };


  });
