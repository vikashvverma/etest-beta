// var Twitter = require('twitter');
//
// var client = new Twitter({
//   consumer_key: 'xT5YSDG3UVHkiSfG3Hk2hamkM',
//   consumer_secret: 'B0I2SjkmqnGXt4r9tC6XVlaF8G76dltMxkcuumg8WQsOwtHHGR',
//   access_token_key: '3113514491-Q9BffsoPJVYsRnWHAZh9Fu1p1ME6gnP2WIU6As5',
//   access_token_secret: 'aBxX4OoXjm5Wm46ztGGGOmYSrusnOeM1GtGASPTIrR25j'
// });
//
//
//
// function getTweetCount(req,res,id){
//   var params = {id:  id};
//   client.get('https://api.twitter.com/1.1/statuses/show.json', params, function(error, tweets, response){
//     if (!error) {
//       console.log(tweets["retweet_count"]);
//       res.status(200).json({count:tweets["retweet_count"]});
//     }else{
//       res.status(200).json({count:0});
//     }
//   });
// }
// module.exports=getTweetCount
