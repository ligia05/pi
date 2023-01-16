const { check } = require('express-validator');
const {clientes} = require('../models');


const validaForm = [
    check('nome')
        .trim()
        
        .notEmpty().withMessage('nome do item precisa ser preenchido').bail()
        
        .custom(async(value,{req})=>{
            const meusClientes = await clientes.findOne({
                where: {
                    nome:value
                }
            });
            if (meusClientes){
                throw new Error('cliente já existe')
            }
            return true
        }),
    

    check('email')
      
        
        .notEmpty().withMessage('tipo do item precisa ser preenchido').bail()
        .toInt(),


    check('endereco')
        .trim()
       
        .notEmpty().withMessage('marca do item precisa ser preenchida').bail()
        .toInt(),


    
];
module.exports = validaForm;
