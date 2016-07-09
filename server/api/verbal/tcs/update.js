var Test = require('./verbal.model');
var fs = require('fs');


module.exports = function () {
  fs.readFile('./question.json', function (err, data) {
    if (err) {
      return console.log(err);
    }
    var models = JSON.parse(data.toString());
    console.log(JSON.stringify(models,null,4));
    for (var i = 0; i < models.length; i++) {
      update(models[i])
    }
  });
};

function update(model) {
  Test.findOne({id: model.id}, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    if (!data) {
      console.log(err);
      return;
    }
    data.asked = model.asked || [];
    data.answers = model.answers || [];
    data.save(function (err) {
      if (err)console.log(err);
      console.log("Updated : ", JSON.stringify(model, null, 4));
    });
  });
}
