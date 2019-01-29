/* eslint-disable no-console */
const express = require('express');
const app = express();
// const authRoute = require('../lib/routes/auth');
const connection = require('../lib/middleware/connection');
const { bearerToken } = require('../lib/middleware/ensureAuth');
const { handler } = require('../lib/middleware/error')

// app.use((req, res, next) => {
//   req.startTime = Date.now();
//   res.on('finish', () => {
//     const responseTime = Date.now() - req.startTime;
//     console.log(`${req.method} ${req.url} [${res.statusCode}] = ${responseTime}ms`);
//   });
//   next();
// });

app.use(express.json());
app.use('/ensureAuth', bearerToken)
app.use('/auth', connection, require('../lib/routes/auth'));

app.use(handler);

module.exports = app;
