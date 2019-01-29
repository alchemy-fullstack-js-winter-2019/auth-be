const express = require('express');
const app = express();
const notFound = require('./middleware/notFound');
const { handler } = require('./middleware/error');
const connection = require('./middleware/connection');
const { bearerToken, ensureAuth } = require('./middleware/ensureUser');


app.use(express.json());

app.use('/auth', connection, require('./routes/auth'));
app.use(bearerToken);
app.use(ensureAuth);

app.get('/', function(req, res, next) {
  res.send('Hello Moto.');
  next();
});

app.use(notFound);
app.use(handler);


module.exports = app;
