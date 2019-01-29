const express = require('express');
const app = express();
const auth = require('../lib/routes/auth');
const connection = require('./middleware/connection');
const { handler } = require('./middleware/error');

app.use(express.json());
app.use('/auth', connection, auth);
app.use(handler);

module.exports = app;
