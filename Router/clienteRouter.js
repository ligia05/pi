const express = require('express');
const router = express.Router();
const clienteController= require('../controller/clienteController')
const validaForm = require('../Middlewares/cadastrador')
const operacionalController = require('../controller/operacionalController')
const cadastroController = require ('../controller/cadastroController')
const log = require('../Middlewares/log')

router.get('/cadastro',clienteController.create);
router.post('/cadastro',validaForm,cadastroController.store)
module.exports=router