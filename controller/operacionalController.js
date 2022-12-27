const { Itens } = require('../models');

const {validationResult} = require('express-validator');
const fs = require('fs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const operacionalController = {
   busca: async (req, res) => {
        const { key } = req.query;
        const itens = await Itens.findAll({
            where: {
                tipo: {
                    [Op.like]: `%${key}%`
                }
            },
            include:['itens']
        });
        return res.render('loja', { ItensCadastrados: itens, paginas: 0 })
    },
    edit: async (req, res) => {
        const { id } = req.params;
        const itens = await Itens.findByPk(id,{
            include:['itens']
        });
        const editItens= await itens.findAll();
        return res.render('editar', {editItens})
    },
    update: async (req, res) => {
        const { id } = req.params;
        const { Itens,cliente,tipo,modelo,preco,marca,produto} = req.body;
        console.log(req.body)
       
        const imagem = req.file.filename;
        const meusItens = await Itens.findOne({
            where: {
                id
            }
        })
     
        meusItens.produto = Itens
        meusItens.modelo = modelo
        meusItens.marca = marca
        meusItens.preco= preco
        meusItens.tipo = tipo
     
        meusItens.imagem = "/img/posters/" + imagem
        await meusItens.save()

        
    },
    delete: async (req, res) => {
        const Itens_id = req.params.id;
        await Itens.destroy({ where: { id:Itens_id } });
        return res.redirect("/formulario")
    },
   
}
module.exports = operacionalController;