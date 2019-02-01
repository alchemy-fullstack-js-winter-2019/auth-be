/* eslint-disable no-console */
const express = require('express');
const app = express();
const connection = require('../lib/middleware/connection');
const { handler } = require('../lib/middleware/error');
const notFound = require('./middleware/notFound');
const { bearerToken } = require('../lib/middleware/ensureAuth');


app.use(express.json());

app.use(bearerToken);
app.use('/auth', connection, require('../lib/routes/auth'));

app.use(notFound);
app.use(handler);

module.exports = app;
