//Pacote inicial para iniciar o projeto
const express = require('express');

//Importando celebrate: faz a validação dos campos
const { celebrate, Segments, Joi } = require('celebrate');

//Controllers
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const SaleController = require('./controllers/SaleController');
const ProfileController = require('./controllers/ProfileController');

const routes = express.Router();

//Login
routes.post('/sessions', SessionController.create);

//Listar casos especificos de um usuario
//Fazendo a validação dos campos
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),//Authorization precisa ser uma string e obrigatoria
    }).unknown(),
}), ProfileController.index);

//Deletar uma venda
//Fazendo a validação dos campos
routes.delete('/sales/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),//ID é um numero e obrigatorio
    })
}), SaleController.delete);

//Listar todas as vendas do banco de dados
//Fazendo a validação dos campos
routes.get('/sales', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),//Page precisa ser numerica
    })
}), SaleController.index);

//Cadastro de uma nova venda
routes.post('/sales', SaleController.create);

//Listar todos os usuarios do banco de dados
routes.get('/users', UserController.index);

//Cadastro de um novo usuario
//Fazendo a validação dos campos
routes.post('/users', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),//Nome ele é uma string e é obrigatorio
        email: Joi.string().required().email(),//Email é uma string, é obrigatório e tem que ser no formato de e-mail
        whatsapp: Joi.string().required().min(12).max(13),//Whatsapp é do tipo numero, no minimo 12 caracteres e no maximo 13
        city: Joi.string().required(),//City é uma string e obrigatorio
        uf: Joi.string().required().length(2),//Uf é uma string obrigatorio e o tamanho no maximo de 2 caracteres
    })
}), UserController.create);

module.exports = routes;