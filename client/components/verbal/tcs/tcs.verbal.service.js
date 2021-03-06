'use strict';

angular.module('etestApp')
  .factory('TCSVerbalService', function Auth($location, $rootScope, $http, User, $cookieStore, $q, $log, $sce, ngNotify, store) {
    var currentUser = {};
    var currentTest = {};
    var result = {};
    var wordCountSuggestion = function (count) {
      if (count < 50)
        return 'Bad! You email should contain at least 50 words.';
      if (count <= 70)
        return 'Good! You can add a few more words.';
      if (count <= 80)
        return 'Excellent! Your email is of precise length.';
      return 'Bad! Your email is lengthy. Avoid making it too long.';
    };

    var salutationError = function (content) {
      return content.indexOf('Dear') < 0;
    };
    var leaveTakingError = function (content) {
      return content.indexOf('Thanks') < 0 && content.indexOf('Thanks and Regards') && content.indexOf('Thanks and regards') < 0 && content.indexOf('Regards') < 0;
    };
    var unmatchedPhrases = function (phrases, content) {
      phrases = phrases.trim().toUpperCase().split('-');
      var answer = content.toUpperCase().replace(/[\n]/g, ' ').replace(/\s\s/g, ' ');
      var unmatchedPhrases = [];
      for (var i = 0; i < phrases.length; i++) {
        var matchInMiddle = answer.match(new RegExp(" " + phrases[i].trim(), "gi"));
        var matchAtEnd = answer.match(new RegExp(" " + phrases[i].trim()+".", "gi"));
        if ( matchInMiddle || matchAtEnd){
          continue;
        }
          unmatchedPhrases.push(phrases[i].toLowerCase());
      }
      return unmatchedPhrases;
    };

    var scoreSuggestion = function (score) {
      if (score < 50)
        return 'Bad! Improve your score.';
      if (score < 80)
        return $sce.trustAsHtml('Good! Missed something? Here are a few tips to remember : <a href="http://goo.gl/AouxeV" target="_blank">http://goo.gl/AouxeV</a>');
      if (score < 90)
        return 'Very Good! Your chance of getting selected is high. Improve your score.';
      return 'Excellent! You will qualify Verbal Ability Test. Avoid any spelling or grammatical error.';
    };

    var checkSpellingAndGrammar = function () {
      var deferred = $q.defer();
      AtD.checkCrossAJAX('tcs-verbal-exam-answer',
        {
          success: function (errorCount) {
            if (errorCount == 0) {
              //alert("No writing errors were found");
            }
          },

          error: function (reason) {
            $log.error(reason);
            deferred.reject({reason: reason});
          },
          ready: function (msg) {
            //$log.info(msg);
            deferred.resolve({errorCount: msg})
          }
        });
      return deferred.promise;
    };
    var capitalizationError = function (content) {
      if (content)
        return 0;
      var count = 0;
      count += (content.length - content.replace(' i ', '  ').length);
      content = content.replace('Mr.', '');
      content = content.replace('Ms.', '');
      var sentences = content.trim().split('.');
      for (var i = 0; i < sentences.length; i++) {
        sentences[i] = sentences[i].trim();
        if ((sentences[i].charAt(0) + '') == (sentences[i].charAt(0) + '').toUpperCase())
          continue;
        else
          count++;
      }
      return count;
    };
    var evaluate = function (words, outline, content) {
      result = {};
      result.count = words;
      result.unmatchedPhrases = unmatchedPhrases(outline, content);
      result.salutationError = salutationError(content);
      result.leaveTakingError = leaveTakingError(content);
      result.capError = capitalizationError(content);
      result.spellcheck = checkSpellingAndGrammar;
      var mistakes = [];
      var score = 50;
      result.mistakes = mistakes;

      if (words < 50) {
        result.score = 0;
        mistakes.push(
          {
            title: $sce.trustAsHtml("Too Short"),
            subtitle: $sce.trustAsHtml("Minimum word required is 50."),
            description: $sce.trustAsHtml("<strong style='font-size:20px;color:red;'>Your Email must contain at least 50 words</strong>. Your email would not be evaluated.")
          });
        return result;
      }

      if (result.salutationError) {
        score -= 10;
        mistakes.push(
          {
            title: $sce.trustAsHtml("Salutation Error"),
            subtitle: $sce.trustAsHtml("You have not provided a proper salutation."),
            description: $sce.trustAsHtml(" Include a proper salutation e.g. \'Dear\' ")
          });
      }
      if (result.capError > 0) {
        score -= 10;
        mistakes.push({
          title: $sce.trustAsHtml("Capitalization Error"),
          subtitle: $sce.trustAsHtml("Capitalization of word required at the begining of a sentence."),
          description: $sce.trustAsHtml("Number of capitalization errors : " + capError)
        });
      }
      if (result.unmatchedPhrases.length) {
        score -= 20;
        mistakes.push({
          title: $sce.trustAsHtml("Outline not matched"),
          subtitle: $sce.trustAsHtml("All phrase given in the outline must match."),
          description: $sce.trustAsHtml("Ensure all your phrases are matched. The following phrases did not match : <br>" + result.unmatchedPhrases.join("-"))
        });
      }
      if (result.leaveTakingError) {
        score -= 10;
        mistakes.push({
            title: $sce.trustAsHtml("Leave-taking Error"),
            subtitle: $sce.trustAsHtml("You have not used a correct form of leave taking."),
            description: $sce.trustAsHtml("Recommended :<br/> " + [
                '<ul>',
                '<li>Regards</li>',
                '<li>Thanks</li>',
                '<li>Thanks and regards</li>'
              ].join(''))
          }
        );
      }
      if (words < 70) {
        score += 30;
      } else if (words <= 90) {
        score += 40
      } else {
        score += 35;
      }
      result.mistakes = mistakes;
      result.countRemark = wordCountSuggestion(words);
      result.score = score;
      result.scoreRemark = scoreSuggestion(score);
      return result;
    };

    return {
      getRankStatistics: function (id, userId) {
        return $http.get('/api/verbal/tcs/stat/rank/' + id, {params: {userId: userId}}).success(function (data) {
          var rankStatistics =store.get("verbalRankStatistics") || {};
          rankStatistics[id] = data;
          store.set("verbalRankStatistics", rankStatistics);
        }).error(function (err) {
          store.get("verbalRankStatistics") ? $q.resolve(store.get("verbalRankStatistics"))
            : $q.reject(err);
          //$log.error(err);
        });
      },
      getAllStatistics: function (userId) {
        return $http.get('/api/verbal/tcs/stat/all', {params: {userId: userId}}).success(function (data) {
          //$log.info(data);
          store.set("verbalAllStatistics", data);
        }).error(function (err) {
          store.get("verbalAllStatistics") ? $q.resolve(store.get("verbalAllStatistics"))
            : $q.reject(err);
          //$log.error(err);
        });
      },
      getStatistics: function (id, userId) {
        return $http.get('/api/verbal/tcs/stat/' + id, {params: {userId: userId}}).success(function (data) {
          //$log.info(data);
          $q.resolve(data);
          var allStatistics =store.get("verbalStatistics") || {};
          allStatistics[id] = data;
          store.set("verbalStatistics", allStatistics);
        }).error(function (err) {
          //console.error(err);
          store.get("verbalStatistics") ? $q.resolve(store.get("verbalStatistics"))
            : $q.reject(err);
        });
      },
      getTests: function () {
        return $http.get('/api/verbal/tcs').success(function(data){
          store.set("tcsVerbalAllTests", data);
        }).error(function(err){
          store.get("tcsVerbalAllTests") ? $q.resolve(store.get("tcsVerbalAllTests"))
            : $q.reject(err);
        });
      },
      getTest: function (id) {
        return $http.get('/api/verbal/tcs/' + id)
          .success(function (data) {
            currentTest = data;
            currentTest.time = {
              minute: 10,
              second: 0,
              seconds: 600
            };
            currentTest.word = 0;
            currentTest.answer = '';
            $q.resolve(data);
            var tests= store.get("tcsVerbalTests") || {};
            tests[id] = data;
            store.set("tcsVerbalTests", tests);
          }).error(function (err) {
            store.get("tcsVerbalTests") ? $q.resolve(store.get("tcsVerbalTests"))
              : $q.reject(err);
          });
      },
      getLeaderBoard: function (id) {
        return $http.get('/api/verbal/tcs/leaderboard/' + id)
          .success(function (data) {
            $q.resolve(data);
            var leaderboard= store.get("tcsVerbalLeaderboard") || {};
            leaderboard[id] = data;
            store.set("tcsVerbalLeaderboard", leaderboard);
          }).error(function (err) {
            $q.reject(err);
            store.get("tcsVerbalLeaderboard") ? $q.resolve(store.get("tcsVerbalLeaderboard"))
              : $q.reject(err);
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
        currentTest = test;
      },
      get: function (id) {
        if (currentTest.id == id)
          return currentTest;
        else
          $location.path('/');
        return false;
      },
      getTestTResult: function (id) {
        if (currentTest.id != id)
          return $location.path('/');
        return evaluate(currentTest.word, currentTest.outline, currentTest.answer);
      },
      notify: function (message, type) {
        ngNotify.set(message, type);
      },
      highlightMatchedPhrases: function (outline, answer) {
        if (!answer || !answer.length) {
          return "";
        }

        for (var i = outline.length - 1; i >= 0; i--) {
          var matchedPhrase = answer.match(new RegExp(" " + outline[i].trim(), "gi"));
          if (matchedPhrase && matchedPhrase.length) {
            answer = answer.replace(new RegExp(matchedPhrase[0], "gi"), "<span class='phrase' style='color:#4caf50;'><strong>" + matchedPhrase[0] + "</strong></span>")
          }
        }
        return answer
      }
    };


  });
