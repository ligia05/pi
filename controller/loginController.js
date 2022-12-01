// const usuarios = require('../database/usuarios.json');
const { sequelize, clientes } = require('../models');
const fs = require('fs');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

module.exports = {
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
      return res.render("loja", { old: req.body, errors: {email: {msg: "Email já cadastrado"}}});
    }

    if (errors.isEmpty()) {
      console.log("Sem erros");

      // let novoUsuario = req.body;
      // console.log(novoUsuario)

      let { nome, email, senha } = req.body;
      const hash = bcrypt.hashSync(senha, 10)
      let novoUsuario = await cliente.create(
        { nome, email, senha: hash }
      ).catch(err => console.log(err))

      // Criando session do usuario recém cadastrado para conseguir redirecionar sem fazer login
      novoUsuario.senha = undefined
      delete novoUsuario.senha

      req.session.usuario = novoUsuario

      res.redirect('/loja')
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



    if (!usuario) {

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
      res.redirect('/formulario')
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

  // primeiro_acesso: (req,res) => {
  //   res.render('primeiro_acesso');
  // },

  // estadoDeHumor: (req, res) => {
  //   res.render('escolha_estado');
  // },

  // indicacao: (req, res) => {
  //   res.render('indicacao');
  // }
};
