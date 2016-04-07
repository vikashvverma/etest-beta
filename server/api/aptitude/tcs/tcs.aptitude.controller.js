'use strict';
var _ = require('lodash');
var async = require("async");
var Test = require('../aptitude.model');
var TCS = require('./aptitude.model');

exports.index = function (req, res) {

  TCS.find({}, function (err, tests) {
    if (err) {
      return handleError(res, err);
    }
    tests = tests.sort(function (a, b) {
      return a.id > b.id ? 1 : -1;
    });
    const result = [];
    for (let i = 0; i < tests.length; i++) {
      let test = {
        id: tests[i].id,
        name: tests[i].name,
        attempted_on: tests[i].attempted_on
      };
      test.count = tests[i].statistics.length;
      if (tests[i].statistics.length) {
        var user = tests[i].statistics.reduce(function (prev, cur) {
          return prev.score > cur.score ? prev : cur;
        });
        test.highest_score = user.score;
        test.highest_scorer = user.name;
        user = tests[i].statistics.reduce(function (prev, cur) {
          return prev.date > cur.date ? prev : cur;
        });
        test.last_attempt_by = user.name;
        test.last_attempt_on = user.attempted_on;
        console.log(JSON.stringify(user, null, 4));
      }
      result.push(test);
    }
    res.status(200).json(result);
  });
};

exports.fetch = function (req, res) {
  console.log(req.params.id);
  Test.find({
      exam: {
        $elemMatch: {
          name: "TCS",
          qset: req.params.id
        }
      }
    })
    .limit(30)
    .select({
      id: 1,
      question: 1,
      hasQImage: 1,
      qImageUrl:1,
      options: 1,
      lod: 1,
      exam: 1,
      answer: 1,
      explanation: 1,
      hasAExplanation: 1,
      hasAnswerImage: 1,
      section: 1,
      year: 1,
      attempted_on: 1,
      statistics: 1,
    })
    .sort({
      id: 1
    })
    .exec(
      function (err, data) {
        if (err) {
          return handleError(res, err);
        }
        if (!data) {
          return res.send(404);
        }
        console.log(data);
        var result = data.map((question)=> {
          var q = {
            _id: question._id,
            id: question.id,
            question: question.question,
            hasQImage: question.hasQImage,
            qImageUrl: question.qImageUrl,
            options: question.options,
            lod: question.lod,
            exam: question.exam,
            answer: question.answer,
            explanation: question.explanation,
            hasAExplanation: question.hasAExplanation,
            hasAnswerImage: question.hasAnswerImage,
            section: question.section,
            year: question.year,
            attempted_on: question.attempted_on,
          };
          var correct = question.statistics.filter((stat)=> {
            return stat.isCorrect;
          });
          q.stats = {
            count: question.statistics.length,
            correct: correct.length,
            lastSolved: correct[correct.length - 1],
            lastAttempted: question.statistics[question.statistics.length - 1],
          };
          return q;
        });
        return res.status(200).json(result);
      });

};
exports.create = function (req, res) {
  var test = new Test(req.body);
  test.qset = test.id;
  test.save(function (err, data) {
    if (err) {
      return res.send(500);
    }
    res.json(200, data);
  });
};

exports.update = function (req, res) {
  async.series([
    function (done) {
      Test.find({
          exam: {
            $elemMatch: {
              name: "TCS",
              qset: req.params.id
            }
          }
        })
        .limit(30)
        .select({
          id: 1,
          statistics: 1,
          attempted_on: 1
        })
        .sort({
          id: 1
        })
        .exec(function (err, tests) {
          //console.log(tests);
          if (err) {
            return handleError(res, err);
          }
          if (!tests) {
            return res.send(404);
          }
          var body = req.body;
          async.each(tests, function (test, callback) {
            if (body[test.id]) {
              var stat = body[test.id];
              stat.userId = body.statistics.userId;
              stat.name = body.statistics.name;
              test.statistics.push(stat);
              test.attempted_on = new Date();
              test.save(callback);
            } else {
              callback();
            }
          }, function (err, data) {
            TCS.findOne({id: req.params.id}, function (err, tcs) {
              tcs.statistics.push(body.statistics);
              tcs.save(function (err) {
                if (err) {
                  return handleError(res, err);
                }
                return res.status(200).json({success: true, error: false, msg: "Result updated!"});
              });
            });

          }); // done is call when all stats are saved!!!!
        });
    }
  ], function allTaskCompleted() {
    console.log('done');
  });

};
//id is objectid
//TODO: May be removed (not used for aptitude)
exports.patch = function (req, res) {
  Test.findOne({id: req.params.testId}, function (err, data) {
    if (err) {
      return handleError(res, err);
    }
    if (!data) {
      return res.send(404);
    }
    var length = data.statistics.length, index = -1;
    for (var i = 0; i < length; i++) {
      if (data.statistics[i]._id == req.params.id) {
        index = i;
        break;
      }
    }
    if (i >= 0) {
      data.statistics.splice(i, 1);
    }
    data.statistics.push(req.body);
    data.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(data.statistics[data.statistics.length - 1]);
    });
  });
};

exports.getRankStatistics = function (req, res) {
  if (!req.query.userId) {
    return res.send(404);
  }
  Test.findOne({qset: req.params.id}, function (err, data) {
    if (err) {
      return handleError(res, err);
    }
    if (!data) {
      return res.send(404);
    }
    var out = {};
    data.map(function (obj) {
      if (out[obj.userId]) {
        out[obj.userId].score += obj.score;
        out[obj.userId].count += 1;
        out[obj.userId].avg = Number(((out[obj.userId].score) / (out[obj.userId].count)).toFixed(2));
      } else {
        out[obj.userId] = {};
        out[obj.userId].score = obj.score;
        out[obj.userId].count = 1;
        out[obj.userId].avg = obj.score;
      }
      return obj.score;
    });
    var stats = [];
    var temp = {};
    for (var key in out) {
      temp[out[key].avg] = temp[out[key].avg] ? 1 + out[key].avg : 1;
    }
    for (var key in temp) {
      stats.push({y: Number(key), name: temp[key]});
    }
    var index = stats.indexOf(out[req.query.userId].avg);
    if (index >= 0) {
      stats[index] = {
        y: out[req.query.userId].avg,
        marker: {
          symbol: 'url(http://www.highcharts.com/demo/gfx/sun.png)'
        }
      };
    }
    stats = stats.sort(function (prev, next) {
      if (prev.constructor == Object) {
        return prev.y <= next;
      }
      if (next.constructor == Object) {
        return prev <= next.y;
      }
      return prev <= next;
    });
    stats.unshift(0);
    return res.status(200).json([{name: 'Rank', data: stats}]);
  });
};
exports.getAllStatistics = function (req, res) {
  if (!req.query.userId) {
    return res.send(404);
  }
  TCS.find({}, function (err, data) {
    console.log('Aptitude:getAllStatistics() (err,data): ', err, data);
    if (err) {
      return handleError(res, err);
    }
    if (!data) {
      return res.send(404);
    }
    data = data.sort(function (a, b) {
      return a.id > b.id ? -1 : 1;
    });

    var out = [];
    for (var i = data.length - 1; i >= 0; i--) {
      var temp = [];
      for (var j = data[i].statistics.length - 1; j >= 0; j--) {
        if (data[i].statistics[j].userId == req.query.userId)
          temp.push(data[i].statistics[j].score);
      }
      out.push({id: data[i].id, name: 'Set ' + data[i].id, data: temp});
    }
    return res.json(out);
  });
};
exports.getStatistics = function (req, res) {
  //console.log(1,req.query.userId);
  if (!req.query.userId) {
    return res.send(404);
  }
  Test.findOne({qset: req.params.id}, function (err, data) {
    if (err) {
      return handleError(res, err);
    }
    if (!data) {
      return res.send(404);
    }
    var result = data.filter(function (obj) {
      return obj.userId == req.query.userId;
    });
    result = result.map(function (obj) {
      return obj.score;
    });
    //if not used then first element will be hidden
    result.unshift(0);
    return res.status(200).json([{name: 'Set ' + req.params.id, data: result}]);
  });
};
function handleError(res, err) {
  return res.status(500).send(err);
}
