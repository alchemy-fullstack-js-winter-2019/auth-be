const express = require('express');
const app = express();
const connection = require('./middleWare/connect');
const { handler } = require('./middleWare/error');
const notFound = require('./middleware/notFound');

app.use(express.json());

app.use('/auth', connection, require('./routes/auth'));

app.use(notFound);
app.use(handler);



module.exports = app;
