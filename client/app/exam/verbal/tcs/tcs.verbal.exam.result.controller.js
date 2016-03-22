'use strict';

angular.module('etestApp')
  .controller('TCSVerbalExamResultController', function ($scope, $stateParams, $timeout, $location, $log, $interval, $sce, $mdDialog, User, Auth, TCSVerbalService) {
    var vm = this;
    vm.id = $stateParams.id;
    if (!vm.id || !TCSVerbalService.get(vm.id) || !TCSVerbalService.get(vm.id)) {
      return  $location.path('/');
    }else{
      vm.test = TCSVerbalService.get(vm.id);
      vm.result = TCSVerbalService.getTestTResult(vm.id);
      vm.result.userId=Auth.getCurrentUser().user_id;
      vm.result.name=Auth.getCurrentUser().name?Auth.getCurrentUser().name:Auth.getCurrentUser().first_name+" "+Auth.getCurrentUser().last_name;
      vm.seriesType='spline';
      vm.resultType='column';
      vm.rankType='spline';
      vm._id='';//test result id used to patch the test result aafiter spell check

      vm.timeout=$timeout(function(){
        if(!vm.result.score) return;
        vm.result.spellcheck().then(function(data){
          var names=countNames(vm.test.names,vm.test.answer);
          if((data.errorCount-names)>0){
            TCSVerbalService.notify("You have made "+(data.errorCount-names)+" mistake(s)!",'error');
            vm.result.score-=10;
          }else{
            vm.result.score+=10;
          }
          if(vm._id){
            TCSVerbalService.patchTest(vm.id,vm._id,vm.result).success(function(data){
              $log.info("Score has been adjusted!",data)
              TCSVerbalService.notify("Your score has been adjusted after checking spelling or grammatical error(s)!",'success');
              vm.getGraphData();
            });
          }

        },function(err){
          TCSVerbalService.notify("Couldn't check spelling and grammar mistake(s)!",'error');
        },function(data){
          TCSVerbalService.notify("Checking Spelling and Grammar!",'info');
        })
      },0);
      TCSVerbalService.updateTest(vm.id,vm.result)
        .success(function(data){
          $log.info(data);
          vm._id=data._id;
          vm.getGraphData();
        }).error(function(err){
          vm.getGraphData();
        });

      vm.getGraphData=function(){

        TCSVerbalService.getStatistics(vm.id,Auth.getCurrentUser().user_id)
          .success(function(data){
            vm.resultData=data;
          });
        TCSVerbalService.getAllStatistics(Auth.getCurrentUser().user_id)
          .success(function(data){
            vm.seriesData=data;
          });
        TCSVerbalService.getRankStatistics(vm.id,Auth.getCurrentUser().user_id)
          .success(function(data){
            vm.rankData=data;
          });
      };

      TCSVerbalService.getLeaderBoard(vm.id).success(function(data){
        vm.leaderboard = data;
      });

        //vm.resultData=[54, 12, 14, 15, 54, 84, 54, 12, 52, 65, 0];
      $scope.$on('$destroy', function () { $timeout.cancel(vm.timeout); });
    }


    //$timeout(vm.checkSpellingAndGrammar,2000);
    //vm.checkSpellingAndGrammar();
    function countNames(names,string){
      var count=0;
      for(var i=names.length-1;i>=0;i--){
        var len=names[i].length;
        count+=(string.length-string.replace(/names[i]/g,''))/len;
      }
      return count;
    }


    //vm.leaderboard = [
    //  {
    //    "score": 100,
    //    "userId": "google-oauth2|114272599754915131822",
    //    "name": "sakshi jain",
    //    "_id": "56ebc4bed925c21100a92b53",
    //    "attempted_on": "2016-03-18T00:49:58.155Z"
    //  },
    //  {
    //    "score": 100,
    //    "userId": "auth0|56d3c1543fcf7ac80f718771",
    //    "name": "arun00624@gmail.com",
    //    "_id": "56d669b816c7e3110089b190",
    //    "attempted_on": "2016-03-02T03:06:12.974Z"
    //  },
    //  {
    //    "score": 90,
    //    "userId": "auth0|56d5fe8d5a5a6aec457d2e2c",
    //    "name": "ambrishpandey2010@gmail.com",
    //    "_id": "56d60206fcdd35110095aafb",
    //    "attempted_on": "2016-03-01T20:39:10.919Z"
    //  },
    //  {
    //    "score": 80,
    //    "userId": "auth0|56daee2f330246d412df0b99",
    //    "name": "hrshimanshu@gmail.com",
    //    "_id": "56db046bf163eb1100795cef",
    //    "attempted_on": "2016-03-05T09:02:25.308Z"
    //  },
    //  {
    //    "score": 80,
    //    "userId": "google-oauth2|100477453917696579955",
    //    "name": "Princy Abraham",
    //    "_id": "56e7e892ab33d0110070bd42",
    //    "attempted_on": "2016-03-15T07:36:16.509Z"
    //  },
    //  {
    //    "score": 80,
    //    "userId": "google-oauth2|116428298383507492501",
    //    "name": "abdul rehman",
    //    "_id": "56d536233676ac110095a2c5",
    //    "attempted_on": "2016-03-01T04:40:58.395Z"
    //  },
    //  {
    //    "score": 70,
    //    "userId": "auth0|56d54eb6b141950f08ffcf74",
    //    "name": "dimple.rajeswari@gmail.com",
    //    "_id": "56d5549b3676ac110095a2da",
    //    "attempted_on": "2016-03-01T04:40:58.395Z"
    //  },
    //  {
    //    "score": 70,
    //    "userId": "auth0|56d411dcb729117560a5a652",
    //    "name": "pravin.durgam@rediffmail.com",
    //    "_id": "56d4184d8320ac1100e84bf1",
    //    "attempted_on": "2016-02-29T09:36:32.385Z"
    //  },
    //  {
    //    "score": 70,
    //    "userId": "auth0|56dd9ecd88ac8c3c6a8a0fed",
    //    "name": "ramyadandu22@gmail.com",
    //    "_id": "56de64cc0e3e891100208392",
    //    "attempted_on": "2016-03-08T01:52:22.437Z"
    //  },
    //  {
    //    "score": 70,
    //    "userId": "auth0|56deec7781de292e0cb7700f",
    //    "name": "sprshshrivastava@gmail.com",
    //    "_id": "56e18282bc626f1100c89b06",
    //    "attempted_on": "2016-03-10T00:50:16.234Z"
    //  },
    //  {
    //    "score": 70,
    //    "userId": "auth0|56e4e45b4a315645777d6885",
    //    "name": "flamingo027@gmail.com",
    //    "_id": "56e643f55b3f4d110074ec0d",
    //    "attempted_on": "2016-03-14T03:07:55.285Z"
    //  },
    //  {
    //    "score": 60,
    //    "userId": "auth0|56d34c2ffb74523b1b6b85eb",
    //    "name": "shrutishree0805@gmail.com",
    //    "_id": "56d494dc4018131100e009b3",
    //    "attempted_on": "2016-02-29T16:54:45.476Z"
    //  },
    //  {
    //    "score": 60,
    //    "userId": "auth0|56de60aa3b31364e44d400b7",
    //    "name": "srana@pmaps.in",
    //    "_id": "56de62ef0e3e891100208390",
    //    "attempted_on": "2016-03-08T01:52:22.437Z"
    //  },
    //  {
    //    "score": 60,
    //    "userId": "auth0|56e7987f1b3e39f15a8e39f4",
    //    "name": "sainithecoolboy@gmail.com",
    //    "_id": "56e7a2f9f7e6a41100da0017",
    //    "attempted_on": "2016-03-15T01:08:28.063Z"
    //  },
    //  {
    //    "score": 60,
    //    "userId": "auth0|56dc1029657e36da7421e45a",
    //    "name": "compsmk@gmail.com",
    //    "_id": "56dc14998b63be1100e0f294",
    //    "attempted_on": "2016-03-05T23:05:50.431Z"
    //  },
    //  {
    //    "score": 55,
    //    "userId": "google-oauth2|103235842697652264887",
    //    "name": "Kavya P",
    //    "_id": "56eecefabf724311006510c2",
    //    "attempted_on": "2016-03-20T13:55:34.139Z"
    //  },
    //  {
    //    "score": 50,
    //    "userId": "auth0|56eed95ae98a4b467a6c2aeb",
    //    "name": "sandeepasingh116@gmail.com",
    //    "_id": "56eedf25bf724311006510c6",
    //    "attempted_on": "2016-03-20T13:55:34.139Z"
    //  },
    //  {
    //    "score": 50,
    //    "userId": "auth0|56d9a9c8310b8e40513e0cd2",
    //    "name": "khuranapriya456@gmail.com",
    //    "_id": "56d9e0d65a479b11003fb7cb",
    //    "attempted_on": "2016-03-04T16:52:29.945Z"
    //  },
    //  {
    //    "score": 40,
    //    "userId": "auth0|56e70b2419cba2064688f0d0",
    //    "name": "rahul.janshi1504@gmail.com",
    //    "_id": "56eaf106fcae62110028abe6",
    //    "attempted_on": "2016-03-17T10:58:56.555Z"
    //  },
    //  {
    //    "score": 0,
    //    "userId": "facebook|481140915403161",
    //    "name": "Bhavani Vodde",
    //    "_id": "56d3a2429dcb4b110020f970",
    //    "attempted_on": "2016-02-29T01:24:01.968Z"
    //  },
    //  {
    //    "score": 0,
    //    "userId": "facebook|984461448314960",
    //    "name": "Pragati Chaurasiya",
    //    "_id": "56d9d11f5a479b11003fb7c8",
    //    "attempted_on": "2016-03-04T16:52:29.945Z"
    //  },
    //  {
    //    "score": 0,
    //    "userId": "linkedin|VOyg1Txv4C",
    //    "name": "NARSI RAM YADAV",
    //    "_id": "56d341c8694d5d110051d364",
    //    "attempted_on": "2016-02-28T16:25:12.179Z"
    //  }
    //];
  });
