/**
 * Created by Vikash on 26/03/16.
 */
var Test=require('./aptitude.model.js');
var TCSAptitude=require('./tcs/aptitude.model.js');
var fs=require('fs');


module.exports=function(){
  function save(models,i){
    var model=new Test(models[i]);
    model.options=[{
      option1:models[i].option1,
      option2:models[i].option2,
      option3:models[i].option3,
      option4:models[i].option4
    }];
    model.exam=[{
      name:"TCS",
      qset:models[i].qset
    }];
    model.section=[models[i].section];
    model.statistics=[];//10000 records take 4 MB space
    model.save(function(err,model){
      i++;
      if(i<models.length){
        save(models,i);
      }
      console.log(err);
      if(err)console.log(err);
      console.log("Saved : ",JSON.stringify(model,null,4));
    });
  }
  fs.readFile('./aptitude.json',function(err,data){
    if(err){
      return console.log(err);
    }
    var models=JSON.parse(data.toString());
    console.log(JSON.stringify(models[0],null,4));
    //save(models,0);
    var aptitude=new TCSAptitude({
      id:1,
      name:"TCS Analytical Ability Test 1",
      qser:1,
      statistics:[]
    });
    var aptitude1=new TCSAptitude({
      id:2,
      name:"TCS Analytical Ability Test 2",
      qser:2,
      statistics:[]
    });
    var aptitude2=new TCSAptitude({
      id:3,
      name:"TCS Analytical Ability Test 3",
      qset:3,
      statistics:[]
    });
    //aptitude.save();
    //aptitude1.save();
    //aptitude2.save();

  });
};
