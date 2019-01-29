

`app.use('/auth', authRoute)`

app.use(require('morgan')('dev', {
  skip() {
    return process.env.NODE_ENV === 'test';
  }
}));

module.exports = app;
