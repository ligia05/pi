const { sequelize, clientes } = require('../models');
const fs = require('fs');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const cadastroController = {
  cadastro: (req, res) => {
    res.render("cadastro");
  },

  store: async (req, res) => {
    let errors = validationResult(req)
    let emailCadastrado = await clientes.findAll({
      where: {
        email: req.body.email
      }
    })

    // Verificando se e-mail já está cadastrado
    if(emailCadastrado[0] != undefined) {
      return res.render("cadastro", { old: req.body, errors: {email: {msg: "Email já cadastrado"}}});
    }

    if (errors.isEmpty()) {
      console.log("Sem erros");

      // let novoclientes = req.body;
      // console.log(novoclientes)

      let { nome, email, senha } = req.body;
      const hash = bcrypt.hashSync(senha, 10)
      let novoclientes = await clientes.create(
        { nome, email, senha: hash }
      ).catch(err => console.log(err))

      // Criando session do clientes recém cadastrado para conseguir redirecionar sem fazer login
      novoclientes.senha = undefined
      delete novoclientes.senha
      req.session.clientes = novoclientes

      res.redirect('/cadastro')
    } else {
      res.render("loja", { errors: errors.mapped(), old: req.body });
    }
  },

  showlogin: (req, res) => {
    res.render("login", { error: null });
  },

  login: async (req, res) => {
    const { email, senha, logado } = req.body;

    const usuario = await clientes.findOne({
      where: {
        email: email,

      }
    }).catch(console.trace);



    if (!clientes) {

      return res.render('login', { error: "Login/Senha inválidos" });

    }
    const senhaValida = bcrypt.compareSync(senha, usuario.senha)
    if (!senhaValida) {

      return res.render('login', { error: "Login/Senha inválidos" });

    }
    usuario.senha = undefined
    delete usuario.senha
    req.session.usuario = usuario;

    if(logado != undefined) {
      res.cookie('logado', usuario.email, {maxAge: 600000000})
    }

    // Verificando infos do usuário na session
    // console.log(req.session.usuario.toJSON());
    if (usuario.eh_admin) {
      res.redirect('/produtos')
    }
    
      else {
    res.redirect('/loja')
    }
  },
  logout: async (req, res) => {
    await req.session.destroy();
    res.clearCookie("logado");

    console.log(req.cookies);
    res.redirect('/');
  }
};
module.exports = cadastroController;