const express = require('express');
const app = express();
//middlewars get executed in order. 
const connection = require('./middleWare/connect');
const { handler } = require('./middleWare/error');
const notFound = require('./middleware/notFound');
const { bearerToken } = require('./middleware/ensureAuth');

app.use(express.json());

app.use(bearerToken);
app.use('/auth', connection, require('./routes/auth'));

app.use(notFound);
app.use(handler);



module.exports = app;
