const express = require('express');
const router = express.Router();
const depoly = require('../module/deploy');
const rollBack = require('../module/rollBack.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.all('/deploy/:module', function(req, res, next) {
  let ret = depoly(req.params.module);
  res.send(ret);
});
router.get('/roll_back/:tag',  function (req, res, next) {
  let ret = rollBack.rollBack();
  res.send(ret);
});
module.exports = router;
