/* eslint-disable no-console */
const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const { email, password } = req.body;
    User.create({ email, password })
      .then(user => {
        res.send({ user, token: user.authToken() });
      })
      .catch(next);
  })
  .post('/signin', (req, res, next) => {
    const { email, password } = req.body;
    if(User && User.compare(password)) {
      User.findOne({ email })
        .then(user => {
          res.send({ user, token: user.authToken() });
        })
        .catch(next);
    } else {
      console.log('401 "Bad email or password"');
    }
  });



