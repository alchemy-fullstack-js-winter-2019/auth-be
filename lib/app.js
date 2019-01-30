const express = require('express');
const app = express();
const connection = require('./middleware/connection');
const authRoute = require('./routes/auth');
const notFound = require('./middleware/notFound');
const { handler } = require('./middleware/error');
const { bearerToken } = require('./middleware/ensureAuth');

app.use(require('morgan')('dev', {
  skip() {
    return process.env.NODE_ENV === 'test';
  }
}));

app.use(express.json());

app.use(bearerToken);
app.use('/auth', connection, authRoute);

app.use(notFound);
app.use(handler);


module.exports = app;
