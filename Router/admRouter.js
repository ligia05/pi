
const express = require('express')
const router = express.Router();
const multer = require("multer");
const storage= multer.diskStorage(
    {
        destination: (req,file,cb)=>{cb(null,__dirname +'/../public/images')},
        filename: (req,file,cb)=> {cb(null,Date.now() +'-' + file.originalname)}

    }
);
const upload= multer({storage})

const admController = require('../controller/admControler');
const indexController = require('../controller/indexController');
const validaForm = require('../Middlewares/cadastrador')
router.get("/formulario", indexController.postform);
router.post("/formulario",upload.single('img'), admController.store);

module.exports= admRouter