'use strict';
var _ = require('lodash');
var Test = require('./aptitude.model');

exports.index = function (req, res) {

    Test.find({}, function (err, tests) {
        if (err) {
            return handleError(res, err);
        }
        tests = tests.sort(function (a, b) {
            return a.id > b.id ? 1 : -1;
        });

        res.status(200).json(tests);
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
        console.log(data);
        return res.json(data);
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
    Test.findOne({id: req.params.id}, function (err, data) {
        console.log(req);
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
            return res.status(200).json(data.statistics.pop());
        });
    });
};
//id is objectid
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
    Test.find({userId: req.query.userId}, function (err, data) {
        if (err) {
            return handleError(res, err);
        }
        if (!data) {
            return res.send(404);
        }
        var sets = [];
        data = data.sort(function (a, b) {
            sets.push(a.qset);
            return a.qset > b.qset ? -1 : 1;
        });

        sets = sets.filter(function (val, index, arr) {
            return arr.indexOf(val) == index;
        });

        sets.sort();

        var out = [];
        for (var i = sets.length - 1; i >= 0; i--) {
            out.push({id: sets[i], name: 'Set ' + sets[i], data: []});
        }
        for (var j = data.length - 1; j >= 0; j--) {
            out[data.qset - 1].data.push(data[j].score);
        }
        return res.status(200).json(out);
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
