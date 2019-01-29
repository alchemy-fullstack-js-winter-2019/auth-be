const express = require('express');
const app = express();
const auth = require('../lib/routes/auth');
const connection = require('../lib/middleware/connection');


app.use(express.json());
app.use('/auth', auth);
app.use(connection);

module.exports = app;
