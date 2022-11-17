
const {itens}= require ('../models')
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
  form: (req, res) => {
    res.render("formulario");
  },
  
  postForm: async (req, res) => {

    const {itens} = req.body;
  
    const novo = await itens.findOne({
      where:{
       itens:itens
      }
    });
      return res.render('formulario');

  },
 itens: async (req, res) => {

    // Capturando Itens do BD
    let promise = await itens.findAll();

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
  //   const { itens } = req.body;

  //   const novo = await Novoitens.findOne({
  //     where: {
  //       itens: itens,
  //     },
  //   }).catch(console.trace);

  //   return res.render("formulario");

  //   req.session.novo = novo;

  //   res.redirect("/primeiro_acesso");
  // },
  form: async (req, res) => {
    let itens = await itens.findAll()
  
    res.render('formulario',{itens});
},
  postForm: async (req, res) => {

    const {itens} = req.body;
  
    const novo = await itens.findOne({
      where:{
        itens:itens
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
      
    })
   
   

  }
};


module.exports = indexController