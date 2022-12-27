const express = require('express');
const router = express.Router();
const clienteController= require('../controller/clienteController')
const validador = require('../Middlewares/cadastrador')


router.get('/formulario',validador,clienteController.buscar);

module.exports=router