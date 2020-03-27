const express = require('express');

const app = express();

//Usado para que o express entenda que todas as requisições que chegam no app sejam no formato json
app.use(express.json());

/**
 * Rotas / Recursos
 */
app.post('/users', (request, response) => {
    const params = request.body;
    console.log(params);
    return response.json({
        evento: 'Semana OmoniStack',
        aluno: 'Rodrigo Cabral'
    });
});

app.listen(3333);