const { sequelize,clientes } = require('../models');
const { validationResult } = require('express-validator');
const fs = require('fs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const clienteController = {
    create: async (req, res, next) => {
        try {
            const cliente = await clientes.create(req.body);

            return({clientes});
        } catch (error) {
            next(error);
        }
    },
    
    buscar: async (req, res) => {
        const { key } = req.query;
        const cliente = await clientes.findAll({
            where: {
                nome: {
                    [Op.like]: `%${key}%`
                }
            },

        });
        return res.render('lista', { clienteCadastrados: clientes, paginas: 0 })
    },
    
    editar: async (req, res) => {
        const { id } = req.params;
        const {clientes} = await clientes.findByPk(id, {
            include: ['id']
        });
        return res.render('formulario', { clientes })
    },
    update: async (req, res) => {
       const {id_cliente} =req.params;
       const {nome,email,senha,endereco}=req.body
       console.log(req.body)
        const meusclientes =await clientes.findone({
            where: {
                id_cliente
            },
        });
                meusclientes.id = id_cliente
                meusclientes.nome = nome
                meusclientes.email = email
                meusclientes.senha = senha
                meusclientes.endereco = endereco
                 await meusclientens.save()

        // Verificando se e-mail já está cadastrado
        if (emailCadastrado[0] != undefined) {
            return res.render("formulario", { old: req.body, errors: { email: { msg: "Email já cadastrado" } } });
        }
        if (errors.isEmpty()) {
            console.log("Sem erros");

            // let novoUsuario = req.body;
            // console.log(novoUsuario)

            const { nome, email, senha, endereco } = req.body;
            const hash = bcrypt.hashSync(senha, 10)
            const meusclientes = await clientes.create(
                { nome, email, senha, endereco: hash }
            ).catch(err => console.log(err))

            // Criando session do clientes recém cadastrado para conseguir redirecionar sem fazer login
            meusclientes.senha = undefined
            delete meusclientes.senha

            req.session.clientes = meusclientes

            res.redirect('/loja')
        } else {
            res.render("formulario", { errors: errors.mapped(), old: req.body });
        }
    },
    delete: async (req, res) => {
        const id_cliente = req.params.id;
        await clientes.destroy({ where: { id: id_cliente } });
        return res.redirect("/lista")
    },
  postformulario: async (req, res) => {
        try {
            let erros = validationResult(req)
            console.log(erros.isEmpty())

            if (erros.isEmpty()) {
                const { nome, email, senha, endereco } = req.body;

            }    

                if (Array.isArray(clientes)) {
                    clientes.forEach(async clientes => {
                        await clientes.create({
                            id_clientes:clientes.id

                        }),

                            req.app.locals.mensagemCadastrocliente = 'cliente cadastrado com sucesso'
                        
                        return res.redirect('/formulario')
                        res.render("formulario", { errors: erros.mapped(), old: req.body });
                    }
                    )}
                }
                    catch (error) {
                        console.trace(error);
                    }
            
                },
        }
        module.exports= clienteController;