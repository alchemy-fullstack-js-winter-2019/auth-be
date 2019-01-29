const express = require('express');
const app = express();
const connection = require('./middleware/connection');
// const users = require('./models/User');
const authRoute = require('./routes/auth');
const { handler } = require('./middleware/error');
const notFound = require('./middleware/notFound');
const ensureAuth = require('./middleware/ensureAuth');


app.use(require('morgan')('dev', {
    skip() {
        return process.env.NODE_ENV === 'test';
    }
}));

app.use(express.json());
app.use('/auth', connection, authRoute);

app.use(notFound);
app.use(handler);


module.exports = app; 
