const { check } = require('express-validator');
const {itens} =require ('../models');
const validaForm = [
    check('nome')
        .trim()
        .escape()
        .notEmpty().withMessage('nome do item precisa ser preenchido').bail()
        .isLength({ min: 2, max: 90 }).withMessage('nome do item deve ter pelo menos 2 caracteres').bail()
        .custom(async(value,{req})=>{
            const meusItens = await itens.findOne({
                where: {
                    titulo:value
                }
            });
            if (meusItens){
                throw new Error('itens já existe')
            }
            return true
        }),
    

    check('tipo')
        .trim()
        .escape()
        .notEmpty().withMessage('tipo do item precisa ser preenchido').bail()
        .toInt(),


    check('marca')
        .trim()
        .escape()
        .notEmpty().withMessage('marca do item precisa ser preenchida').bail()
        .toInt(),


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
module.exports = validaForm;