const { itens } = require('../models');
const { validationResult } = require('express-validator');
console.log(new itens())
const admController = {
    showAdm: (req, res) => {
        res.render('produtos')
    },


    formItens: async (req, res) => {

        try {
            let itensLoja = await itens.findAll()
            res.render('produtos', { itensLoja });
        } catch (error) {
            console.log(error)
        }


    },
    postFormItens: async (req, res) => {
        try {
            let erros = validationResult(req)
            console.log(erros.isEmpty())

            if (erros.isEmpty()) {
                const meusItens = new itens()
                const { itens:front, tipo, modelo, preco, marca } = req.body
                const imagem = req.file.filename;
                console.log(req.body, req.file);
                meusItens.produto = front
                meusItens.modelo = modelo
                meusItens.marca = marca
                meusItens.preco = preco
                meusItens.tipo = tipo

                meusItens.imagem = "/images/" + imagem
                const itensId = await meusItens.save()
                // if (Array.isArray(itens)) {
                //     itens.forEach(async itens => {
                //         await itens.create({
                //             itens_id: itensId

                //         }),
                //             req.app.locals.mensagemCadastroitem = 'item cadastrado com sucesso'
                         return res.redirect('/produtos');

                //     }

                //     )
                // }
            }
            res.json(erros);
        }

        catch (error) {
            console.trace(error);
        }

    },
}
module.exports = admController;
