const express = require('express')
const multer = require("multer");
const storage= multer.diskStorage(
    {
        destination: (req,file,cb)=>{cb(null,__dirname +'/../public/images')},
        filename: (req,file,cb)=> {cb(null,Date.now() +'-' + file.originalname)}

    }
);
const upload= multer({storage})
const router = express.Router();
const admController = require('../controller/admControler');
router.get("/produtos/cadastro",admController.create);
router.post("/produtos/create",upload.single('img'), admController.store);

module.exports=router