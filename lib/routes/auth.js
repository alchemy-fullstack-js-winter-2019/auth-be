const { Router } = require('express');
const { HttpError } = require('../middleware/error');
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
          res.send({
            user: user,
            token: user.authToken()
          });
        } else {
          next(new HttpError(401)); // schema has built-in error msg
        }
      })
      .catch(next);
  });

