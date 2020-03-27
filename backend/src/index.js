const express = require('express');
/** Aqui usamos o './' para que o node entenda que não se trata de um pacote, como o express, e sim de um arquivo */
const routes  = require('./routes');

const app = express();

//Usado para que o express entenda que todas as requisições que chegam no app sejam no formato json
app.use(express.json());

app.use(routes);

app.listen(3333);