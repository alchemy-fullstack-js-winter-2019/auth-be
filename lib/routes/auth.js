const { Router } = require('express');
const User = require('../models/User');
const { HttpError } = require('../middleware/error');
const { ensureAuth } = require('../middleware/ensureUser');


module.exports = Router()
  .post('/signup', (req, res, next) => {
    const { email, password } = req.body;
    User
      .create({ email, password })
      .then(user => res.send({ user, token: user.authToken() }))
      .catch(next);
  })

  .post('/signin', (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email })
      .then(user => {
        if(!user) {
          return next(new HttpError(401, 'Bad email or password'));
        }

        return Promise.all([
          Promise.resolve(user), user.compare(password)
        ]);
      })
      .then(([user, passwordCorrect])  => {
        if(passwordCorrect) {
          res.send({ user, token: user.authToken() });
        }
        else next(new HttpError(401, 'Bad password/email'));
      })
      .catch(next);
  })

  .get('/verify', ensureAuth, (req, res) => {
    res.send(req.user);
  });
