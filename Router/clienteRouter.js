const express = require('express');
const router = express.Router();
const clienteController= require('../controller/clienteController')
const validador = require('../Middlewares/cadastrador')


router.get('/produtos',validador,clienteController.buscar);

module.exports=router