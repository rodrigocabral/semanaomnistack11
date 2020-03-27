/**
 * Arquivos de rotas do aplicação
 */
const express = require('express');

/** Desaclopando o módulo de rotas do express para dentro de uma nova variável */
const routes = express.Router()

routes.post('/users', (request, response) => {
    const params = request.body;
    console.log(params);
    return response.json({
        evento: 'Semana OmoniStack',
        aluno: 'Rodrigo Cabral'
    });
});

/** Exportar a variavel de dentro do arquivo para que possa ser acessível de outros */
module.exports = routes;