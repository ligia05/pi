const express = require('express');
const router = express.Router();
const clienteController= require('../controller/clienteController')


const cadastroController = require ('../controller/cadastroController')
const validador = require('../Middlewares/validador')
const log = require('../Middlewares/log')


router.get('/cadastro',clienteController,cadastroController.create);
router.post('/cadastro',validador,clienteController,cadastroController.store)
router.get('/login',log,login.showlogin)
router.post('/login', login.login)
router.get('/logout', login.logout)


module.exports=router