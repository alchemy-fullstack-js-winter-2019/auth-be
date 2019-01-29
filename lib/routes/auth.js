const { Router } = require('express');
const User = require('../models/User');
const { ensureAuth } = require('../middleware/ensureUser');
const { HttpError } = require('../middleware/error');

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
        if(user) {
          return user.compare(password)
            .then(compared => {
              if(compared) return res.send({ token: user.authToken(), user });
              return 0;
            });
        }
        next(new HttpError(401, 'Bad email or password'));
      })
      .catch(next);
  })

  .get('/verify', ensureAuth, (req, res) => res.send(req.user));
