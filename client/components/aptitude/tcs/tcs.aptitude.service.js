'use strict';

angular.module('etestApp')
  .factory('TCSAptitudeService', function Auth($location, $rootScope, $http, User, $cookieStore, $q, $log, $sce, ngNotify, store) {
    var currentUser = {};
    var questions = [];
    var test = {};
    var currentQuestion = {};
    var result = {};
    var time = 0;
    var testId = -1;

    function evaluate() {

    }

    //TODO: Check score evaluation
    function getScore() {
      var score = 0;
      questions.map(function (question) {
        if (question.ans) {
          var marks = 0;
          if (question.lod > 2) {
            marks += question.ans == question.answer ? 2 : -2 / 3;
          } else {
            marks += question.ans == question.answer ? 1 : -1 / 3;
          }
          score += marks;
        }
      });
      return Math.floor(score * 100) / 100;
    }

    function getTime() {
      return time;
    }

    function getCorrect() {
      return questions.filter(function (question) {
        return question.ans == question.answer;
      }).length;
    }

    function getIncorrect() {
      return questions.filter(function (question) {
        return question.ans && question.ans != question.answer;
      }).length;
    }

    function getSkipped() {
      return questions.filter(function (question) {
        return !question.ans;
      }).length;
    }

    return {
      getRankStatistics: function (id, userId) {
        return $http.get('/api/aptitude/tcs/stat/rank/' + id, {params: {userId: userId}}).success(function (data) {
          $log.info(data);
        }).error(function (err) {
          //$log.error(err);
        });
      },
      getAllStatistics: function (userId) {
        return $http.get('/api/aptitude/tcs/stat/all', {params: {userId: userId}}).success(function (data) {
          //$log.info(data);
        }).error(function (err) {
          //$log.error(err);
        });
      },
      getStatistics: function (id, userId) {
        return $http.get('/api/aptitude/tcs/stat/' + id, {params: {userId: userId}}).success(function (data) {
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
            test = {};
            time = 4800;
            $q.resolve(data);
          }).error(function (err) {
            $q.reject(err);
          });
      },
      getLeaderBoard: function (id) {
        return $http.get('/api/aptitude/tcs/leaderboard/' + id)
          .success(function (data) {
            $q.resolve(data);
          }).error(function (err) {
            $q.reject(err);
          });
      },
      updateTest: function (id) {
        var profile = store.get('profile');
        var testData = {
          statistics: {
            userId: profile.user_id,
            name: profile.name,
            correct: getCorrect(),
            incorrect: getIncorrect(),
            skipped: getSkipped(),
            attempted: getCorrect() + getIncorrect(),
            score: getScore(),
            time: getTime(),
          }
        };
        questions.map(function (question) {
          testData[question.id] = {
            isCorrect: question.ans == question.answer,
          };
        });
        return $http({
          method: 'PUT',
          url: '/api/aptitude/tcs/' + id,
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
      rate: function (id, rating) {
        var profile = store.get('profile');
        var ratingData = {
          userId: profile.user_id,
          rating: rating
        };
        return $http({
          method: 'PUT',
          url: '/api/aptitude/tcs/rate/' + id,
          data: ratingData
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
        question.ans = answer;
        question.mfr = mfr;
      },
      setTime: function (seconds) {
        time = seconds;
      },
      setTestId: function (id) {
        testId = id;
      },
      getTestId: function (id) {
        return testId;
      },
      getScore: function () {
        return getScore();
      },
      getTestResult: function (id) {
        if (questions[0].exam.filter(function (exam) {
            return exam.name === 'TCS';
          })[0].qset != id)
          return $location.path('/');
        this.updateTest(id);
        return evaluate();
      },
      notify: function (message, type) {
        ngNotify.set(message, type);
      }
    };


  });
