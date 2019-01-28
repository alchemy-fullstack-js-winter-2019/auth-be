const express = require('express');
const app = express();
const authRoute = require('../lib/routes/auth');

app.use(require('morgan')('dev', {
  skip() {
    return process.env.NODE_ENV === 'test';
  }
}));

app.use(express.json());

app.use('/auth', authRoute);

module.exports = app;
