const  {itens}  = require('../models');
const { validationResult } = require('express-validator');
const validacoes=  require('../Middlewares/validador');
const admController = {
    form: async (req, res) => {
       
        try {
            let itensLoja = await itens.findAll()  
            res.render('formulario', { itensLoja });
        } catch (error) {
          console.log(error)  
        }

       
    },
    postForm: async (req, res) => {
        try {
            let erros = validationResult(req)
            console.log(erros.isEmpty())

            if (erros.isEmpty()) {
                const { itens, cliente, tipo, modelo, preco, marca,        } = req.body
                const imagem = req.file.filename;
                console.log(req.body, req.file);
                meusItens.produto = itens
                meusItens.modelo = modelo
                meusItens.marca = marca
                meusItens.preco = preco
                meusItens.tipo = tipo
                meusItens.cliente = cliente
                meusItens.imagem = "/img/" + imagem
                const itensId = await meusItens.save()
                if (Array.isArray(itens)) {
                    itens.forEach(async itens => {
                        await itens.create({
                            itens_id: meusItens.id

                        }),
                            req.app.locals.mensagemCadastroitem = 'item cadastrado com sucesso'
                        return res.redirect('/formulario');
                    }
     
                )}
            }

        }

        catch (error) {
            console.trace(error);
        }

    },
}
module.exports = admController;
