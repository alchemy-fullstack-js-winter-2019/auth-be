const express = require('express');
const app = express();
// const notFound = require('./middleware/notFound');
const { handler } = require('./middleware/error');
const connection = require('./middleware/connection');
const authRoute = require('./routes/auth');

app.use(express.json());
app.use('/auth', connection, authRoute);
// app.use(connection);
// app.use(notFound);
app.use(handler);

module.exports = app;
