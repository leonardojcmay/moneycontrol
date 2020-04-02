//Conexão com o banco de dados
const knex = require('knex');
const configuration = require('../../knexfile');

//Conectando com os dados do arquivo knexfile, os dados da conexão do banco de dados development
const connection = knex(configuration.development);

module.exports = connection;