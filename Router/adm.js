const multer = require ("multer");
const storage= multer.diskStorage(
    {
        destination: (req,file,cb)=>{cb(null,__dirname +'/../public/images')},
        filename: (req,file,cb)=> {cb(null,Date.now() +'-' + file.originalname)}

    }
);
const upload= multer({storage})