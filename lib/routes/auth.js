const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    console.log('posting');
    const { email, password } = req.body;

    User
      .create({ email, password })
      .then(user => res.send({ token: user.authToken(), user }))
      .catch(next);
  });
