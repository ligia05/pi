const  {itens}  = require('../models');

const admController = {
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
                const { itens, cliente, tipo, modelo, preco, marca} = req.body
                const imagem = req.file.filename;
                console.log(req.body, req.file);
                meusItens.produto = itens
                meusItens.modelo = modelo
                meusItens.marca = marca
                meusItens.preco = preco
                meusItens.tipo = tipo
                
                meusItens.imagem = "/img/" + imagem
                const itensId = await meusItens.save()
                if (Array.isArray(itens)) {
                    itens.forEach(async itens => {
                        await itens.create({
                            itens_id: itensId

                        }),
                            req.app.locals.mensagemCadastroitem = 'item cadastrado com sucesso'
                        return res.redirect('/produtos');
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
