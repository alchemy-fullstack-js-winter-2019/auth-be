const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const { email, password } = req.body;
    User
      .create({ email, password })
      .then(user => res.send({ token: user.authToken(), user }))
      .catch(next);
  })

  .post('/signin', (req, res, next) => {
    const { email, password } = req.body;
    User
      .findOne({ email })
      .then(user => {
        if(user && user.compare(password)) return res.send({ token: user.authToken(), user });
        res.status(401);
        return res.send('Bad email or password');
      })
      .catch(next);
  });
