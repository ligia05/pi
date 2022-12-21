
const express = require('express')
const router = express.Router();
const multer = require("multer");
const storage= multer.diskStorage(
    {
        destination: (req,file,cb)=>{cb(null,__dirname +'/../public/images')},
        filename: (req,file,cb)=> {cb(null,Date.now() +'-' + file.originalname)}

    }
);
const upload= multer({storage});
const operacionalController= require('../controller/operacionalController')
const loginController = require('../controller/loginController');
const admController = require('../controller/admController');
const clienteController= require('..clienteController');
const validador = require('../Middlewares/cadastrador');

router.get('/formulario', admController.form);
router.post('/formulario',admController.postForm);
//router.post("/formulario",upload.single('img'), operacionalController.store);

module.exports= router;