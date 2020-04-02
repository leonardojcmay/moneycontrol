//Pacote inicial para iniciar o projeto
const express = require('express');

//Controllers
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//Login
routes.post('/sessions', SessionController.create);

//Listar todos os usuarios do banco de dados
routes.get('/users', UserController.index);

//Cadastro de um novo usuario
routes.post('/users', UserController.create);

module.exports = routes;