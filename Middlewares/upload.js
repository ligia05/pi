const multer = require('multer');
const Configmulter= require('../config/configMulter');

const upload = multer(Configmulter);

module.exports = upload.single('images');