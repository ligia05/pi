
const express = require('express')
const router = express.Router();

const homeController= require('../controller/homeController');



router.get('/loja',homeController.loja);
router.get('/',homeController.home);


module.exports= router;