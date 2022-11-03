
const {Filme, Humor}= require ('../models')
const session = require('express-session')

const Sequelize= require('sequelize')
const Op = Sequelize.Op

const controller = {
  home: (req, res) => {
    res.render("home");
  },

 loja: (req, res) => {
    res.render("loja");
  },

 itens: async (req, res) => {

    // Capturando Itens do BD
    let promise = await Itens.findAll();

    // Adicionando Itens num array com objetos de Itens {id, nome}
    let arrayItens = [];
    promise.forEach(e => {
      arrayItens.push(e.toJSON());
    });

    console.log(arrayItens);


    res.render("loja", {arrayItens});
  },

  contato: (req, res) => {
    res.render("contato");
  },

  form: (req, res) => {
    res.render("formulario");
  },

  // postForm: async (req, res) => {
  //   const { filme } = req.body;

  //   const novo = await NovoFilme.findOne({
  //     where: {
  //       filme: filme,
  //     },
  //   }).catch(console.trace);

  //   return res.render("formulario");

  //   req.session.novo = novo;

  //   res.redirect("/primeiro_acesso");
  // },
  postForm: async (req, res) => {

    const {iten} = req.body;
  
    const novo = await Itens.findOne({
      where:{
        item:item
      }
    });
      return res.render('formulario');

  },

  listarItens: async(req, res)=>{
    //let page = req.query.page || 1
    let { page = 1 } =  req.query;
    const itens = await itens.findAll({
      limit: 2,
      offset: (page-1)  * 2,
      include:['humor']
    })
    const contagem = await Itens.count()
    const qntPaginas = Math.ceil(contagem / 2)
    return res.render('lista', {
      itenssCadastrados:itens,
      paginas:qntPaginas
    });

  }
};


module.exports = controller