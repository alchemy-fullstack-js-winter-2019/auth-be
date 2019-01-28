const express = require('express');
const app = express();


// app.use(require('morgan')('dev', {
//   skip() {
//     return process.env.NODE_ENV === 'test';
//   }
// }));

app.use(express.json());


module.exports = app;
