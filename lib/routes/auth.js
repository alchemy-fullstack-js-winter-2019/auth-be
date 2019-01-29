const { Router } = require('express');
const User = require('../models/User');
const { HttpError } = require('../middleware/error');

module.exports = Router()

  .post('/signup', (req, res, next) => {
    const { email, password } = req.body;
    User.create({
      email,
      password
    })
      .then(user => {
        res.send({ user, token: user.authToken() });
      })
      .catch(next);
  })

  .post('/signin', (req, res, next) => {
    console.log('HERERERE');
    const { email, password } = req.body;
    console.log('password', password);
    User.findOne({ email })
      .then(user => {
        console.log('user', user);
        return Promise.all([
          Promise.resolve(user),
          user.compare(password)
        ]);
      })
      .then(([user, correctPassword]) => {
        if(correctPassword) {
          res.send({ user, token: user.authToken() });
        } else next(new HttpError(401, 'invalid username or password'));
      })
      .catch(next);
  });
