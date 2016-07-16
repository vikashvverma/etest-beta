'use strict';

angular.module('etestApp')
  .factory('UtilityService', function Auth($location, $rootScope, $http, $window, $mdPanel, store) {
    var filters = {
      popularity: filterByPopularity,
      lastAttempt: filterByLastAttempt,
      latest: filterByDate,
      mostRepeated: filterByMostRepeated,
    };

    function PanelDialogCtrl(name, imageUrl) {
      console.log(name, imageUrl);
      return ['mdPanelRef', function (mdPanelRef) {
        this._mdPanelRef = mdPanelRef;
        var ctrl = this;
        ctrl.name = name;
        ctrl.imageUrl = imageUrl;
        ctrl.closeDialog = function () {
          this._mdPanelRef && this._mdPanelRef.close().then(function () {
            console.log("Avatar Panel closed!")
          });
        }
      }]
    }

    function filterByPopularity(tests) {
      return tests.sort(function (a, b) {
        return b.count - a.count;
      });
    }

    function filterByLastAttempt(tests) {
      return tests.sort(function (a, b) {
        return Date.parse(b.last_attempt_on) - Date.parse(a.last_attempt_on);
      });
    }

    function filterByDate(tests) {
      return tests.sort(function (a, b) {
        return Date.parse(b.date) - Date.parse(a.date);
      });
    }

    function filterByMostRepeated(tests) {
      tests = filterByDate(tests);
      return tests.sort(function (a, b) {
        return b.asked.length - a.asked.length;
      });
    }


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
      },
      showAvatar: function (name, imageUrl) {
        var position = $mdPanel.newPanelPosition()
          .absolute()
          .center();
        var config = {
          attachTo: angular.element(document.body),
          controller: PanelDialogCtrl(name, imageUrl),
          controllerAs: 'ctrl',
          disableParentScroll: true,
          templateUrl: 'components/util/avatar.panel.html',
          hasBackdrop: true,
          panelClass: 'avatar-dialog',
          position: position,
          trapFocus: true,
          zIndex: 150,
          clickOutsideToClose: true,
          escapeToClose: true,
          focusOnOpen: true
        };
        $mdPanel.open(config);
      },
      filterVerbalSets: function (sets, filter) {
        if (!filters[filter]) {
          return sets;
        }

        var transformedTests = [];
        sets.map(function (set) {
          transformedTests = transformedTests.concat(set.tests);
          return set;
        });

        var tests = transformedTests.sort(function (a, b) {
          return a.id - b.id;
        });
        var data = [];
        var set = {tests: []};
        tests = filters[filter](transformedTests);
        tests.map(function (test) {
          set.tests.push(test);
          if (set.tests.length === 3) {
            data.push(set);
            set = {tests: []};
          }
        });
        return data;
      }
    };


  });
