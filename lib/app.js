const express = require('express');
const app = express();

const auth = require('./routes/auth');
const { bearerToken } = require('./middleware/ensureAuth');
const error = require('./middleware/error');
const connection = require('./middleware/connection');
const notFound = require('./middleware/notFound');

app.use(express.json());
app.use(bearerToken);

app.use('/auth', connection, auth);

app.use(notFound);
app.use(error);

module.exports = app;


