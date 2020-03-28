/**
 * Arquivos de rotas do aplicação
 */
const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

/** Desaclopando o módulo de rotas do express para dentro de uma nova variável */
const routes = express.Router()

routes.post('/sessions', SessionController.create)

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.index);

/** Exportar a variavel de dentro do arquivo para que possa ser acessível de outros */
module.exports = routes;