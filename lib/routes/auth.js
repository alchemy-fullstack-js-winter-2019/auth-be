const { Router } = require('express');
// const { HttpError } = require('../middleware/error');
const User = require('../models/User');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const { email, password } = req.body;
    User
      .create({ email, password })
      .then(user => res.send({
        user: user,
        token: user.authToken()
      }))
      .catch(next);
  });

