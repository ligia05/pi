
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


const admController = require('../controller/admController');
const clienteController= require('../controller/clienteController');
const validador = require('../Middlewares/cadastrador');

router.get('/produtos', admController.formItens);
router.post('/produtos',admController.postFormItens);

//router.post("/formulario",upload.single('img'), operacionalController.store);

module.exports= router;