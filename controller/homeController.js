
const { validationResult } = require('express-validator');



const homeController = {
    home: (req, res,next) => {
      res.render("home");
    },
 
      loja: (req, res) =>{
        res.render('loja')
      }
    }

    module.exports = homeController