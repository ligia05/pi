const express = require('express');
const lojaController= require('../controller/lojaController')

const router = express.Router();

router.get('/loja',function(req, res, next) {
    res.render('loja')
});
module.exports = router;