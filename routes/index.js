var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login.html');
});

router.get('/test', function(req, res, next){
  res.render('test.html');
});

router.get('/list', function(req, res, next){
  res.render('list.html')
});

module.exports = router;
