
const {itens} = require ('../models');
const { check } = require('express-validator');
const validaItens = [

    check('tipo')
    .trim()
    .escape()
    .notEmpty()
    .isLength()
    .custom(async(value,{req})=>{
            const meusItens = await itens.findOne({
                where: {
                    id_itens:value
                }
            });
            if (meusItens){
                throw new Error('itens já existe')
            }
            return true
        }),
    check('marca')
    .trim()
    .escape()
    .notEmpty().withMessage('marca do item precisa ser preenchida').bail(),
        


    check('preco')

        .escape()
        .notEmpty().withMessage('preço do item precisa ser preenchido').bail()
        .isLength({ min: 20, max: 80000 }).withMessage('preco do item está fora das especificações'),

    check('images')
   .custom(function(value,{req}){
        if(req.file && req.file.mimetype.indexOf('images/') >=0){
            return true
        }
        return false
    }).withMessage('uma imagem precisa ser inserida'),
        
    
];
module.exports = validaItens;