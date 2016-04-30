var fs = require('fs');

fs.readFile('./aptitude1.json', function (err, data) {
  if (err) {
    return console.log(err);
  }
  var models = JSON.parse(data.toString());
  console.log(JSON.stringify(models[0], null, 4));
  writeJSON(parse(models));
});

function parse(data) {
  var temp = JSON.parse(JSON.stringify(data));
  var obj = [];
  var k = 91;
  var set = 4;
  for (var i = 0; i < temp.length; i++) {
    for (j = i + 1; j < temp.length; j++) {
      if (temp[i][0].trim() == temp[j][0].trim() && temp[i][1].trim() == temp[j][1].trim() && temp[i][2].trim() == temp[j][2].trim() && temp[i][3].trim() == temp[j][3].trim()) {
        console.log("Matched:")
        console.log(JSON.stringify(temp[i], null, 4));
        console.log(JSON.stringify(temp[j], null, 4));
        console.log("/Matched:")
        break;
      }
    }
    if (j == temp.length) {
      var t = temp[i];
      var question = {
        "id": k++,
        "question": t.question,
        "option1": t[0],
        "option2": t[1],
        "option3": t[2],
        "option4": t[3],
        "answer": t['a'],
        "lod": t.lod ? t.lod : 1,
        "qset": parseInt((obj.length / 30)) + 4
      };
      obj.push(question);
    }
  }
  //obj = obj.sort(function (a, b) {
  //  return Number(a.lod) - Number(b.lod);
  //});
  return obj;
}

function writeJSON(data) {
  fs.writeFile("./aptitude2.json", JSON.stringify(data, null, 4), function (err) {
    if (err) {
      return console.log(err);
    }

    console.log(data.length);
  });
}

