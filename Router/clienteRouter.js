const express = require('express');
const router = express.Router();
const clienteController= require('../controller/clienteController')
const validador = require('../Middlewares/cadastrador')
const operacional = require('../controller/operacionalController')
const cadastroController = require ('../controller/cadastroController')
const log = require('../Middlewares/log')

router.get('/cadastro',clienteController.create);
router.post('/cadastro',validador,clienteController.create)
module.exports=router