const express = require('express');
const itensController= require('../controller/itensController')

const router = express.Router();

router.get('/loja',function(req, res, next) {
    res.render('loja')
});
module.exports = itensRouter;