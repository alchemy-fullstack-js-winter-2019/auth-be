/* eslint-disable no-console */
const { Router } = require('express');
const User = require('../models/User');

const auth = Router()
  .post('/signup', (req, res, next) => {
    const { email, password } = req.body;
    User.create({ email, password })
      .then(user => user.authToken())
      .then((token) => {
        console.log(token);
        res.send({ token });})
      .catch(next);  
  });

module.exports = auth;
