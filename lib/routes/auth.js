/* eslint-disable no-console */
const { Router } = require('express');
const User = require('../models/User');
const { HttpError } = require('../../middleware/error');
const { ensureAuth } = require('../../middleware/ensureAuth');

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
    User.findOne({ email })
      .then(user => {
        return Promise.all([
          Promise.resolve(user),
          user.compare(password)
        ]);
      })
      .then(([user, passwordCorrect]) => {
        if(passwordCorrect) {
          res.send({ user, token: user.authToken() });
        } else {
          next(new HttpError(401, 'Username of Password Invalid'));
        }
      })
      .catch(next);
    
  })
  .get('/verify', ensureAuth, (req, res, next) => {
    res.send(req.user);
  });




