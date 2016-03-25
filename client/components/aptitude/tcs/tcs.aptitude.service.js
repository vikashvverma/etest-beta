'use strict';

angular.module('etestApp')
  .factory('TCSAptitudeService', function Auth($location, $rootScope, $http, User, $cookieStore, $q, $log, $sce, ngNotify) {
    var currentUser = {};
    var questions = [];
    var test = {};
    var currentQuestion = {};
    var result = {};

    return {
      getRankStatistics: function (id, userId) {
        return $http.get('/api/verbal/tcs/stat/rank/' + id, {params: {userId: userId}}).success(function (data) {
          $log.info(data);
        }).error(function (err) {
          //$log.error(err);
        });
      },
      getAllStatistics: function (userId) {
        return $http.get('/api/verbal/tcs/stat/all', {params: {userId: userId}}).success(function (data) {
          //$log.info(data);
        }).error(function (err) {
          //$log.error(err);
        });
      },
      getStatistics: function (id, userId) {
        return $http.get('/api/verbal/tcs/stat/' + id, {params: {userId: userId}}).success(function (data) {
          //$log.info(data);
          $q.resolve(data);
        }).error(function (err) {
          //console.error(err);
          $q.reject(err);
        });
      },
      getTests: function () {
        return $http.get('/api/aptitude/tcs');
      },
      getTest: function (id) {
        return $http.get('/api/aptitude/tcs/' + id)
          .success(function (data) {
            questions = data;

            $q.resolve(data);
          }).error(function (err) {
            $q.reject(err);
          });
      },
      getLeaderBoard: function (id) {
        return $http.get('/api/verbal/tcs/leaderboard/' + id)
          .success(function (data) {
            $q.resolve(data);
          }).error(function (err) {
            $q.reject(err);
          });
      },
      updateTest: function (id, testData) {
        return $http({
          method: 'PUT',
          url: '/api/verbal/tcs/' + id,
          data: testData
        }).success(function (data) {
          //$log.info(data);
          $q.resolve(data);
        }).error(function (err) {
          //$log.error(err);
          $q.reject(err);
        });
      },
      patchTest: function (testId, _id, testData) {
        return $http({
          method: 'PATCH',
          url: '/api/verbal/tcs/' + testId + '/' + _id,
          data: testData
        }).success(function (data) {
          //$log.info(data);
          $q.resolve(data);
        }).error(function (err) {
          //$log.error(err);
          $q.reject(err);
        });
      },
      resetTest: function (test) {
        questions = test;
      },
      getQuestions: function () {
        return questions;
      },
      get: function (id) {
        //TODO: Check login here
        if (id - 1 == questions.length) {
          id = 1;
        }
        currentQuestion = questions[id - 1];
        currentQuestion.index = id;
        if (currentQuestion.index === questions.length)
          currentQuestion.last = true;
        if (currentQuestion.index === 1)
          currentQuestion.first = true;
        currentQuestion.selected = currentQuestion.ans;
        return currentQuestion;
      },
      submit: function (id, mfr, answer) {
        var question = questions.filter(function (question) {
          return question.id === id;
        })[0];
        question.ans=answer;
        question.mfr=mfr;
      },
      getTestTResult: function (id) {
        if (questions.id != id)
          return $location.path('/');
        return evaluate(questions.word, questions.outline, questions.answer);
      },
      notify: function (message, type) {
        ngNotify.set(message, type);
      }
    };


  });
