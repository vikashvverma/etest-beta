'use strict';
var _ = require('lodash');
var Test = require('./verbal.model');
var debug = require('debug')('tcs.verbal.controller');

exports.index = function (req, res) {
  Test.find({}, function (err, tests) {
    if (err) {
      return handleError(res, err);
    }
    tests = tests.sort(function (a, b) {
      return a.id > b.id ? 1 : -1;
    });
    var data = [];
    var set = {tests: []};
    for (var i = 0; i < tests.length; i++) {
      var obj = {};
      obj.id = tests[i].id;
      obj.names = tests[i].names;
      obj.title = tests[i].title;
      obj.question = tests[i].question;
      obj.count = tests[i].statistics.length;
      obj.asked = tests[i].asked;
      if (tests[i].statistics.length) {
        var user = tests[i].statistics;
        var index= 0,score=user[0].score;

        for(let j=1;j<user.length;j++){
          if(user[j].score>=score){
            score=user[j].score;
            index=j;
          }
        }
        obj.highest_score = user[index].score;
        obj.highest_scorer = user[index].name;
        user = tests[i].statistics;
        obj.last_attempt_by = user[user.length-1].name;
        obj.last_attempt_on = user[user.length-1].attempted_on;
      }

      obj.date = tests[i].created_on;
      set.tests.push(obj);
      //building set of 3
      if (set.tests.length == 3 || i == tests.length - 1) {
        data.push(set);
        set = {tests: []};
      }
    }
    return res.json(200, data);
  });
};

exports.fetch = function (req, res) {
  Test.findOne({id: req.params.id}, function (err, data) {
    if (err) {
      return handleError(res, err);
    }
    if (!data) {
      return res.send(404);
    }
    return res.json(data);
  });
};

exports.update = function (req, res) {
  Test.findOne({id: req.params.id}, function (err, data) {
    if (err) {
      return handleError(res, err);
    }
    if (!data) {
      return res.send(404);
    }
    data.statistics.push(req.body);
    data.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, data.statistics.pop());
    });
  });
};

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
      return res.json(200, data.statistics[data.statistics.length - 1]);
    });
  });
};

exports.getRankStatistics = function (req, res) {
  if (!req.query.userId) {
    return res.send(404);
  }
  Test.findOne({id: req.params.id}, function (err, data) {
    if (err) {
      return handleError(res, err);
    }
    if (!data) {
      return res.send(404);
    }
    var out = {};
    data.statistics.map(function (obj) {
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
    // var stats = [];
    // for (var key in out) {
    //   if (req.query.userId == key) {
    //     stats.push({
    //       y: out[key].avg,
    //       marker: {
    //         symbol: 'url(http://www.highcharts.com/demo/gfx/sun.png)'
    //       }
    //     })
    //   } else {
    //     stats.push(out[key].avg);
    //   }
    // }
    var stats = [];
    var temp = {};
    for (var key in out) {
      //increase number of average score holder's count by 1 (i.e. the number of person who has same average score)
      temp[out[key].avg] = temp[out[key].avg] ? 1 + temp[out[key].avg] : 1;
    }

    for (var key in temp) {
      if (out[req.query.userId].avg == Number(key)) {
        stats.push({
          y: Number(key),
          marker: {
            symbol: 'url(http://www.highcharts.com/demo/gfx/sun.png)'
          }
        });
      } else {
        stats.push(Number(key));
      }
    }
    stats = stats.sort(function (prev, next) {
      if (prev.constructor == Object) {
        return next - Number(prev.y);
      }
      if (next.constructor == Object) {
        return Number(next.y) - prev;
      }
      return next - prev;
    });
    if (stats.length && stats[stats.length - 1])
      stats.unshift(undefined);
    return res.json([{name: 'Rank', data: stats}]);
  });
};

exports.getAllStatistics = function (req, res) {
  if (!req.query.userId) {
    return res.send(404);
  }
  Test.find({}, function (err, data) {
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
      temp.unshift(undefined);
      out.push({id: data[i].id, name: 'Set ' + data[i].id, data: temp});
    }
    return res.json(out);
  });
};

exports.getStatistics = function (req, res) {
  if (!req.query.userId) {
    return res.send(404);
  }
  Test.findOne({id: req.params.id}, function (err, data) {
    if (err) {
      return handleError(res, err);
    }
    if (!data) {
      return res.send(404);
    }
    var result = data.statistics.filter(function (obj) {
      return obj.userId == req.query.userId;
    });
    result = result.map(function (obj) {
      return obj.score;
    });
    //if not used then first element will be hidden
    result.unshift(undefined);
    return res.json([{name: 'Set ' + req.params.id, data: result}]);
  });
};

exports.leaderBoard = function (req, res) {
  Test.findOne({id: req.params.id}, function (err, data) {
    if (err) {
      return handleError(res, err);
    }
    if (!data) {
      return res.send(404);
    }

    const scoreMap = {};
    data.statistics.map((stat) => {
      const score = scoreMap[stat.userId] ? scoreMap[stat.userId].score < stat.score ? stat.score : scoreMap[stat.userId].score : stat.score;
      const user = stat;
      user.score = score;
      scoreMap[stat.userId] = user;
    });

    let result = [];
    for (const userId in scoreMap) {
      if (scoreMap[userId].score >= 50) {
        result.push(scoreMap[userId]);
      }
    }
    result = result.sort((prev, cur) => {
      return cur.score - prev.score;
    });
    res.status(200).json(result);
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
