module.exports = {
    showLogin: (req, res) => {
        return res.render('entrar');
    },

    login: (req, res) => {

        const { email, senha } = req.body;
        const produtos = require("../database/produtos.json");
        const produto = produtos.find(
            user => (user.email == email && user.senha == senha)
        );

        if (produto == undefined) {
            return res.send("senha ou email inválidos");
        }
        req.session.produto = produto;
        return res.redirect('/adm/produtos/create');

    },
    logout: (req, res) => {
        req.session.destroy();
        res.redirect("/adm/login");
    },
    
    listar: (req, res) => {
        return res.render('index', { produtos, busca: "" });
        // res.send(produtos)
    },

    getproduto: (req, res) => {

        // Capturar o id requisitado (req.params)
        const idproduto = req.params.id;
        let idPrev = null;
        let idNext = null;

        // Capturar do array a produto com o id requisitado (produtos.find)
        const produto = produtos.find(
            (p, i) => {
                idPrev = produtos[i - 1] == undefined ? undefined : produtos[i - 1].id;
                idNext = produtos[i + 1] == undefined ? undefined : produtos[i + 1].id;
                return p.id == idProduto
            });

        // Retornar a produto encontrada para o cliente (res.send())
        res.render('produto', { produto, idNext, idPrev });

    },

    busca: (req, res) => {

        // Capturar a string digitada pelo visitante


        // Filtrar do arrays de produtos somente as produtos
        // que que tiverem a string buscada no nome
        const produtosFiltrados = produtos.filter(
            p => p.nome.toUpperCase().includes(string.toUpperCase())
        );

        // Renderizar a view index passando para ela
        // as produtos filtradas
        res.render('index', { produtos: produtosFiltrados, busca: string });
    },

    create: (req, res) => {
        res.render('parts/crud/crud.ejs')
    },

    store: (req, res) => {

        const erros = validationResult(req);

        if (!erros.isEmpty()) {
            // return res.send(erros.mapped());
            res.render('adm/produto/cadastro', { erros: erros.mapped() })
        }

        const nome = req.body.nome;
        const marca = req.body.marca
        const preco = Number(req.body.preco);
        const produto = { nome, marca, preco, img: '/images/' + req.file.filename }

        // Adicionar o id à produto recém criada
        produto.id = produtos[produtos.length - 1].id + 1;

        // Adicionar a produto ao array de produtos
        produtos.push(produto);

        // Salvar o json do array de produtos no arquivo produtos.json
        fs.writeFileSync(
            __dirname + '/../database/produtos.json',
            JSON.stringify(produtos, null, 4),
            { flag: 'w' }
        );

        // Direcionar o usuário para a página que exibe a lista de produtos
        res.redirect('/');

    }
}



