const express = require('express');
const router = express.Router();
const clienteController= require('../controller/clienteController')
const loja = require('../controller/homeController')

const cadastroController = require ('../controller/cadastroController')
const validador = require('../Middlewares/validador')
const log = require('../Middlewares/log');
const homeController = require('../controller/homeController');

router.get ('/loja',homeController)
router.get('/cadastro',cadastroController.create);
router.post('/cadastro',validador,cadastroController.store)
router.get('/login',log,cadastroController.showlogin)
router.post('/login', login.login)
router.get('/logout', login.logout)


module.exports=router