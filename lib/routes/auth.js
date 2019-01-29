/* eslint-disable no-console */
const { Router } = require('express');
const User = require('../models/User');

const auth = Router()
  .post('/signup', (req, res, next) => {
    const { email, password } = req.body;
    User.create({ email, password })
      .then(user => {
        res.send({ user, token: user.authToken() });})
      .catch(next);
  });

module.exports = auth;
