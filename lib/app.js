const express = require('express');
const app = express();
const authRoute = require('../lib/routes/auth');
// const ensureAuth  = require('../lib/middleware/ensureAuth');


app.use(express.json());
app.use('/auth', authRoute);

module.exports = app;