var express = require('express'),
  router = express.Router(),
  Follower = require('../models/follower'),
  request = require('request'),
  _ = require('underscore');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
    res.render('index', {
      followers: [],
      user_name: ""
    });
});
router.get('/github', function (req, res, next) {
  var options = {
    url: "https://api.github.com/users/"+ req.query.user_name + "/followers",
    method: 'GET',
    headers: {
      'User-Agent': 'request'
    }
  };

  request(options, function (error, response, body) {
    var result = JSON.parse(body);
    if (!error && response.statusCode == 200) {
      var followers = [];
      _.each(result, function(r){
        followers.push(new Follower({'userName': r.login, "url": r.url, "avatarUrl" : r.avatar_url}));
      });
      res.render('index', {
        user_name: req.query.user_name,
        followers: followers
      });
    }
    if (error){
      res.render('index', {
        user_name: req.query.user_name,
        followers: [],
        error: result.messsage
      });
    }
  });

});
