const produtos = require('../database/produtos.json');

// Criando e exportando o objeto literal que conterá todas as funções (controllers)
module.exports = {

    index: (req, res) => {

        // Verificar se a session produtos está setada.
        // Caso esteja, levantar a quantidade de produtos
        // Caso não esteja, quantidade = 0
        let quantidade = 0;
        if(req.session.produtos){
            quantidade = req.session.produtos.length;
        }

        res.render('index.ejs',{ produtos, quantidade });
    },

    show: (req, res) => {
        // Levantar o id que veio no parâmetro de rota
        let id = req.params.id;

        // Encontrar no array de produtos a aparelho
        let aparelho = produtos.find(p=>p.id == id);

        // Retornar a view aparelho.ejs, a aparelho encontrada
        res.render('aparelho.ejs',{aparelho});
    },

    search: (req, res) => {

        let quantidade = 0;
        if(req.session.produtos){
            quantidade = req.session.produtos.length;
        }

        // Levantar o trecho que está sendo buscado (req.query.q)
        let termoBuscado = req.query.q;
        // Filtrar as produtos para obter somente as produtos com esse trecho
        let produtosFiltradas = produtos.filter(p => p.nome.toLowerCase().includes(termoBuscado.toLowerCase()))
        // retornar a view index.ejs, passando para ela somente as produtos filtradas
        res.render('index.ejs', { produtos: produtosFiltradas, quantidade });
    },

    addCart: (req, res) => {
        
        // Verificar se existe aparelho
        // caso haja, basta adicionar ao array
        // caso não haja a gente cria um array
        
        if(req.session.produtos){
            req.session.produtos.push(req.body.aEscolhida);
        } else {
            req.session.produtos = [req.body.aEscolhida];
        }
        
        res.redirect('/produtos');

        console.log(req.session);

    },

    showCart: (req, res) => {

        // Levantar do array de produtos as produtos que estão na session;
        // ["1" , "3"] ======> [{id:1, nome:"Pepperoni", preco:50}, {id:3, nome:"Fracatu", preco: 32}]
        let idsNoCarrinho = req.session.produtos;
        
        let getAparelhoById = (id) => {
            return produtos.find(p => p.id == id)
        }

        let produtosNoCarrinho = idsNoCarrinho.map(geAparelhoById);

        // Renderizar produtos.ejs, passando as produtos que estão no carrinho, e não os ids;
        res.render("cart.ejs", {produtosNoCarrinho});
    }

}