const { check } = require('express-validator');
const {clientes} = require('../models');

const validacoes = [
    check('nome')
        .notEmpty().withMessage('O campo nome deve ser preenchido').bail(),
        
       

    // check('sobrenome')
    //     .notEmpty().withMessage('O campo sobrenome deve ser preenchido')
    //     .isLength({min: 5, max: 50}).withMessage('O campo sobrenome deve ter pelo menos 5 caracteres')
    //     .bail(),

    check('email')
        .notEmpty().withMessage('O campo e-mail deve ser preenchido').bail(),
        
        // .custom(value => {
        //     let usuario = Usuario.findAll({where: {email: value}});
        //       if (usuario) {
        //         return Promise.reject('E-mail já cadastrado');
        //       }
        //   })

    check('senha')
        .notEmpty().withMessage('O campo de senha precisa ser preenchido'),

        check('endereco')
        .notEmpty().withMessage('O campo endereço deve ser preenchido').bail()
        .isEmail().withMessage('Precisa ser um endereço válido').bail(),
       
];

module.exports = validacoes;
