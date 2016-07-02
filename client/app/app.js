'use strict';
var keywords = ["TCS Verbal Test Simulator", "TCS Email Writing Simulator", "TCS Aptitude Test Online", "TCS Verbal Test Online", " TCS Verbal Ability Test", "TCS Analytical Test", "TCS Analytical Ability Test", "TCS Email Writing", "TCS Sample Email", "TCS Mock Test", "TCS Email Writing Test", "Tcs Email Writing PDF", "Tcs Email Writing Practice", "TCS Verbal Test Simulator", "TCS Email Writing Online Test", "TCS Analytical Ability Test", "TCS Online Analytical Test", "TCS Aptitude Test Papers", "TCS Aptitude Test 2016", "TCS Aptitude Test PDF", "TCS Placement Papers", "TCS Placement Papers With Solutions", "TCS Placement Procedure", "TCS Placement Process", "TCS Placement Papers PDF", "TCS Placement Aptitude Test"];
var verbalKeywords = ["TCS Verbal Test Simulator", "TCS Email Writing Simulator", "TCS Verbal Test Online", "TCS Verbal Ability Test", "TCS Email Writing", "TCS Sample Email", "TCS Mock Test", "TCS Email Writing Test", "Tcs Email Writing PDF", "Tcs Email Writing Practice", "TCS Verbal Test Simulator", "TCS Email Writing Online Test", "TCS Online Analytical Test", "TCS Placement Papers", "TCS Placement Papers With Solutions", "TCS Placement Procedure", "TCS Placement Process"];
var aptitudeKeywords = ["TCS Aptitude Test Online", "TCS Analytical Test", "TCS Analytical Ability Test", "TCS Placement Aptitude Test", "TCS Placement Papers PDF", "TCS Placement Process", "TCS Placement Procedure", "TCS Placement Papers With Solutions", "TCS Placement Papers", "TCS Aptitude Test PDF", "TCS Mock Test", "TCS Aptitude Test Papers", "TCS Aptitude Test 2016", "TCS Aptitude Test PDF"];
var description = "Online TCS Verbal/Analytical Ability Test - Take online TCS Verbal and analytical ability test and improve your performance.";
var url = "http://etest.programminggeek.in/";
var title = "etest | Free Verbal and Aptitude Tests Online";
var image = "http://etest.programminggeek.in/assets/images/favicon.png";
var app = angular.module('etestApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ngMaterial',
    'ngNotify',
    'auth0',
    'angular-storage',
    'angular-jwt'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $mdIconProvider, authProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
    $mdIconProvider.fontSet('fa', 'fontawesome');
    authProvider.init({
      domain: 'programminggeek.auth0.com',
      clientID: 'S6MNYpDy9EEmj0DO6jch3RQfFOtEvzOI'
    });
    $httpProvider.interceptors.push(function ($q) {
      return {
        'request': function (config) {
          //config.url = config.url.match(/api/g) ? "http://etest.programminggeek.in" + config.url : config.url;
          return config || $q.when(config);

        }

      }
    });
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function (response) {
        if (response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, auth, store, jwtHelper, $location, $window, UtilityService) {
    //Go back to the previous stage with this back() call
    var history = [];
    $rootScope.$on('$locationChangeSuccess', function () {
      history.push($location.$$path);
      FB.XFBML.parse($('#facebook-box')[0]);
    });

    $rootScope.back = function () {
      var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
      $location.path(prevUrl);
      history = []; //Delete history array after going back
    };
    $rootScope.commentbox = {
      url: $location.absUrl(),
      width: $window.innerWidth - 40,
      height: 300,
      show: $location.path() == '/' ? false : true
    };

    // This events gets triggered on refresh or URL change
    $rootScope.$on('$stateChangeStart', function (event, next) {
      var token = store.get('token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          if (!auth.isAuthenticated) {
            auth.authenticate(store.get('profile'), token);
          }
        } else {
          // Either show the login page or use the refresh token to get a new idToken
          next.url === '/' || (!next.authenticate && !auth.isAuthenticated) ? undefined : $location.path('/login');
        }
      } else if (next.authenticate && !auth.isAuthenticated) {
        next.url === '/' ? undefined : $location.path('/login');
      }

      if (next.url === '/') {
        $rootScope.commentbox.show = false;
      } else {
        $rootScope.commentbox.show = true;
      }
      // set default meta tags if no meta configured for the next state
      UtilityService.generateMeta({});
    });
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams) {
      $rootScope.commentbox.url = $location.absUrl();
    });

    // Redirect to login if route requires auth and you're not logged in
    //$rootScope.$on('$stateChangeStart', function (event, next) {
    //  //$rootScope.comments="";
    //  Auth.isLoggedInAsync(function(loggedIn) {
    //    if (next.authenticate && !loggedIn) {
    //      $location.path('/login');
    //    }
    //    if(!first){
    //      $timeout(function(){
    //        var url=baseURI+next.url;
    //        //$('#commentbox').html('<div class="fb-comments tcs-card" data-href="'+url+'" data-num-posts="5" data-colorscheme="light" data-order-by="social" data-mobile="1" data-width="100%" data-version="v2.3" style="width:98%;"></div><script src="https://apis.google.com/js/plusone.js"> </script><div class="g-comments" data-href="'+url+'" data-width="'+($window.innerWidth-40)+'" data-first_party_property="BLOGGER" data-height="400" data-view_type="FILTERED_POSTMOD" style="min-height: 300px;"> </div>');
    //        //FB.XFBML.parse($('#commentbox')[0]);
    //      },0);
    //    }
    //    first=false;
    //
    //   // $rootScope.comments=$sce.trustAsHtml('<div class="fb-comments tcs-card" data-href="'+url+'" data-num-posts="5" data-colorscheme="light" data-order-by="social" data-mobile="1" data-width="100%" data-version="v2.3" style="width:98%;"></div><div class="g-comments" data-href="'+url+'" data-width="'+($window.innerWidth-40)+'" data-first_party_property="BLOGGER" data-height="400" data-view_type="FILTERED_POSTMOD" style="min-height: 300px;"> </div>');
    //   // FB.XFBML.parse($('#commentbox')[0]);
    //  });
    //});
    // This hooks al auth events to check everything as soon as the app starts
    auth.hookEvents();
    UtilityService.notifications()
      .success(function (data) {
        UtilityService.notify(data);
      });
    $rootScope.meta = {
      description: description,
      keywords: keywords,
      url: $location.absUrl() || url,
      image: image,
      title: title
    }
  });

app.directive('userAvatar', function () {
  return {
    //template: '<svg class="user-avatar" viewBox="0 0 128 128" height="64" width="64" pointer-events="none" display="block" > <path fill="#FF8A80" d="M0 0h128v128H0z"/> <path fill="#FFE0B2" d="M36.3 94.8c6.4 7.3 16.2 12.1 27.3 12.4 10.7-.3 20.3-4.7 26.7-11.6l.2.1c-17-13.3-12.9-23.4-8.5-28.6 1.3-1.2 2.8-2.5 4.4-3.9l13.1-11c1.5-1.2 2.6-3 2.9-5.1.6-4.4-2.5-8.4-6.9-9.1-1.5-.2-3 0-4.3.6-.3-1.3-.4-2.7-1.6-3.5-1.4-.9-2.8-1.7-4.2-2.5-7.1-3.9-14.9-6.6-23-7.9-5.4-.9-11-1.2-16.1.7-3.3 1.2-6.1 3.2-8.7 5.6-1.3 1.2-2.5 2.4-3.7 3.7l-1.8 1.9c-.3.3-.5.6-.8.8-.1.1-.2 0-.4.2.1.2.1.5.1.6-1-.3-2.1-.4-3.2-.2-4.4.6-7.5 4.7-6.9 9.1.3 2.1 1.3 3.8 2.8 5.1l11 9.3c1.8 1.5 3.3 3.8 4.6 5.7 1.5 2.3 2.8 4.9 3.5 7.6 1.7 6.8-.8 13.4-5.4 18.4-.5.6-1.1 1-1.4 1.7-.2.6-.4 1.3-.6 2-.4 1.5-.5 3.1-.3 4.6.4 3.1 1.8 6.1 4.1 8.2 3.3 3 8 4 12.4 4.5 5.2.6 10.5.7 15.7.2 4.5-.4 9.1-1.2 13-3.4 5.6-3.1 9.6-8.9 10.5-15.2M76.4 46c.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.6-.1-.9.7-1.6 1.6-1.6zm-25.7 0c.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.6-.1-.9.7-1.6 1.6-1.6z"/> <path fill="#E0F7FA" d="M105.3 106.1c-.9-1.3-1.3-1.9-1.3-1.9l-.2-.3c-.6-.9-1.2-1.7-1.9-2.4-3.2-3.5-7.3-5.4-11.4-5.7 0 0 .1 0 .1.1l-.2-.1c-6.4 6.9-16 11.3-26.7 11.6-11.2-.3-21.1-5.1-27.5-12.6-.1.2-.2.4-.2.5-3.1.9-6 2.7-8.4 5.4l-.2.2s-.5.6-1.5 1.7c-.9 1.1-2.2 2.6-3.7 4.5-3.1 3.9-7.2 9.5-11.7 16.6-.9 1.4-1.7 2.8-2.6 4.3h109.6c-3.4-7.1-6.5-12.8-8.9-16.9-1.5-2.2-2.6-3.8-3.3-5z"/> <circle fill="#444" cx="76.3" cy="47.5" r="2"/> <circle fill="#444" cx="50.7" cy="47.6" r="2"/> <path fill="#444" d="M48.1 27.4c4.5 5.9 15.5 12.1 42.4 8.4-2.2-6.9-6.8-12.6-12.6-16.4C95.1 20.9 92 10 92 10c-1.4 5.5-11.1 4.4-11.1 4.4H62.1c-1.7-.1-3.4 0-5.2.3-12.8 1.8-22.6 11.1-25.7 22.9 10.6-1.9 15.3-7.6 16.9-10.2z"/> </svg>'
    template: '<img  ng-src="{{vm.user.picture?vm.user.picture:vm.defaultAvatar}}" class="md-avatar" style="margin-right:0;cursor:pointer;border-radius:50%;width: 50px;height:50px;" />'
  };
});

app.directive('commentBox', function () {
  return {
    transclude: true,
    templateUrl: 'app/plugin/template.html'
  };
});

app.config(function ($mdThemingProvider) {
  var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50'],
    '50': 'ffffff'
  });
  $mdThemingProvider.definePalette('customBlue', customBlueMap);

  //default theme
  $mdThemingProvider.theme('default')
    .primaryPalette('customBlue', {
      'default': '500',
      'hue-1': '50'
    })
    .accentPalette('pink');
  $mdThemingProvider.theme('input', 'default')
    .primaryPalette('grey')

  //forest theme
  $mdThemingProvider.theme('forest')
    .primaryPalette('brown')
    .accentPalette('green');
});

// request permission on page load
document.addEventListener('DOMContentLoaded', function () {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
});
