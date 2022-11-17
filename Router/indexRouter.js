const express = require('express');
const router = express.Router();
const homeController= require('../controller/homeController')



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

module.exports = indexRouter;