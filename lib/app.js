const express = require('express');
const app = express();

const { handler } = require('./middleware/error');

// app.use(require('morgan')('dev', {
//   skip() {
//     return process.env.NODE_ENV === 'test';
//   }
// }));

app.use(express.json());
app.use('/auth', require('./routes/auth'));

app.use(handler);

module.exports = app;
