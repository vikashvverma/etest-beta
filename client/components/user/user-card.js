angular.module("etestApp")
  .directive('userCard', function () {
    return {
      restrict: 'E',
      templateUrl: 'components/user/usercard.tmpl.html',
      scope: {
        name: '=',
        theme: '=',
        picture: '=',
        nickname: '=',
        userId: '='
      },
      controller: function ($scope, $location) {
        $scope.viewProfile = function (user_id) {
          $location.path('profile/' + user_id);
        };
        $scope.theme = $scope.theme || 'default';
      }
    }
  });
