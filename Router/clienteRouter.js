const express = require('express');
const router = express.Router();
const clienteController= require('../controller/clienteController')
const loja = require('../controller/homeController')

const cadastroController = require ('../controller/cadastroController')
const validador = require('../Middlewares/validaForm')
const log = require('../Middlewares/log');


router.get('/cadastro',clienteController.showCadastrar);
router.post('/cadastro',validador,clienteController.store)

router.get('/login',log,cadastroController.showlogin)
router.post('/login',cadastroController.login)
router.get('/logout', cadastroController.logout)


module.exports=router