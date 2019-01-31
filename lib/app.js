const express = require('express');
const app = express();
const authRoute = require('../lib/routes/auth');
const { bearerToken }  = require('../lib/middleware/ensureAuth');
const { handler } = require('./middleware/error');


app.use(express.json());
app.use(bearerToken);
app.use('/auth', authRoute);
app.use(handler);

module.exports = app;