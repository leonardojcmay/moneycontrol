const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const { errors } = require('celebrate');//Para tratar os erros de validação

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;