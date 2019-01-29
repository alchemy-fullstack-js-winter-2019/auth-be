const Users = require('../models/User');
const Router = require('express').Router;

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const { email, password } = req.body;
    Users.create({
      email,
      password
    })
      .then(user => {
        res.send({ user, token: user.makeToken() });
      })
      .catch(next);
  })
  .post('/signin', (req, res, next) => {
    const { email, password } = req.body;
    Users.findOne({ email })
      .then(user => {
        if(user && user.compare(password)) {
          const token = user.makeToken();
          res.send({ user, token });
        }
        else {
          res.statusCode = 401;
          res.statusMessage = 'Bad email or password';
        }
      });
  });


