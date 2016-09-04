var request = require('request');
var cheerio = require('cheerio');
var FormData = require('form-data');

var payload = {
  tcs: {
    question: {
      url: 'http://www.m4maths.com/placement-puzzles.php',
      params: {
        ISSOLVED: 'Y',
        page: 1,
        LPP: 10, //Number of questions
        SOURCE: 'TCS'
      },
    },
    answer: {
      url: 'http://www.m4maths.com/mathsajax.php'
    }
  }
};

exports.scrape = function (req, res) {
  res.end({});
};

exports.fetchQuestions = function (req, res) {
  var requestUrl = formQuestionRequestUrl(req);
  request(requestUrl, (error, response, html) => {
    if (!error) {
      const $ = cheerio.load(html);
      const questions = [];
      const rawQuestions = $('#right dl');
      for (var i = 0; i < rawQuestions.length; i++) {
        try {
          var id = $(rawQuestions[i]).find('dt').attr('id');
          id = id.replace('dt_', '');
          var question = $(rawQuestions[i]).find('h3').html();
          questions.push({id, question});
        } catch (err) {
          console.log(err);
        }
      }
      res.status(200).json(questions);
    } else {
      res.status(500).json({success: false, message: "could not load data, please try again later!"})
    }
  });
};

exports.fetchSolution = function (req, res) {
  var comapny = req.query.company || 'tcs';
  var requestUrl = payload[comapny].answer.url;
  request.post(
    requestUrl, //URL to hit
    {
      form: {
        action: 'readPPuzzleSolution',
        PPID: req.query.id || 155404,
        UID: 577437,
        ANSID: 182172,
      },
      headers: {
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryUkdeQXEhBwwtfOTW',
        Host: 'www.m4maths.com',
        Origin: 'www.m4maths.com',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
        Cookie: '__qca=P0-393380192-1467999247488; __smToken=C5R0oFUlXrhh5zAqvgtLLI8N; PHPSESSID=lcsm5jt8u82mpup8k6k9ft8kk4; cook_mformaths=d22b10bb5a7059179de11a7af8ab299a; mathssite=m4maths.com; __utma=19722596.1480176908.1467999246.1472998660.1473003333.11; __utmc=19722596; __utmz=19722596.1471775891.6.4.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided)'
      }
    },
    function (err, httpResponse, body) {
      if (!err) {
        var $ = cheerio.load(body);
        var solutions = $('.placement_fieldset');
        var solution = [];
        for (var i = 0; i < solutions.length; i++) {
          if ($(solutions[i]).find('.icon-check')) {
            return res.send($(solutions[i]).find('.placement_text').html());
          }
          res.status(400).send({success: false, message: 'answer not found!'})
        }
      } else {
        res.status(500).json({success: false, message: "could not load data, please try again later!"})
      }
    }
  );
};


function formQuestionRequestUrl(req) {
  const company = req.company || 'tcs';
  const url = payload[company].question.url;
  const params = Object.assign({}, payload[company].question.params, req.query ? {
    page: req.query.page,
    LPP: req.query.LPP
  } : {});
  var queryParams = '';
  for (key in params) {
    queryParams += key + '=' + params[key] + '&';
  }
  return url + '?' + queryParams
};
