
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

const validadorItens = require('../Middlewares/validadorItens');

router.get('/prdutos',admController.showAdm)
router.get('/produtos', admController.formItens);
router.post('/produtos',validadorItens, admController.postFormItens);

//router.post("/formulario",upload.single('img'), operacionalController.store);

module.exports= router;