const { clientes } = require('../models');
const { validationResult } = require('express-validator');
const fs = require('fs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const clienteController = {

    buscar: async (req, res) => {
        const { key } = req.query;
        const cliente = await clientes.findAll({
            where: {
                clientes: {
                    [Op.like]: `%${key}%`
                }
            },

        });
        return res.render('lista', { clienteCadastrados: clientes, paginas: 0 })
    },
    editar: async (req, res) => {
        const { id } = req.params;
        const cliente = await clientes.findByPk(id, {
            include: ['id']
        });
        return res.render('formulario', { cliente })
    },
    update: async (req, res) => {
        let errors = validationResult(req)
        let emailCadastrado = await clientes.findAll({
            where: {
                email: req.body.email
            }
        })

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
            const novocliente = await clientes.create(
                { nome, email, senha, endereco: hash }
            ).catch(err => console.log(err))

            // Criando session do clientes recém cadastrado para conseguir redirecionar sem fazer login
            novocliente.senha = undefined
            delete novocliente.senha

            req.session.clientes = novocliente

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
    /*postformulario: async (req, res) => {
        try {
            let erros = validationResult(req)
            console.log(erros.isEmpty())

            if (erros.isEmpty()) {
                const { nome, email, senha, endereco } = req.body;

                meusclientes.id = id_cliente
                meusclientes.nome = nome
                meusclientes.email = email
                meusclientes.senha = senha
                meusclientes.endereco = endereco

                const id_cliente = await meusclientens.save()

                if (Array.isArray(clientes)) {
                    clientes.forEach(async clientes => {
                        await clientes.create({
                            id_clientes: id_cliente.id

                        }),

                            req.app.locals.mensagemCadastroitem = 'cliente cadastrado com sucesso'
                        req.app.locals.errors = erros.mapped();
                        return res.redirect('/formulario')
                        res.render("formulario", { errors: erros.mapped(), old: req.body });
                    }
                    }catch (error) {
                    console.try(error);
                }
            },



        }          
            */
}
module.exports = clienteController;