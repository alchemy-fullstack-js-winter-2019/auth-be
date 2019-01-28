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
        user.makeToken()
          .then(token => {
            res.send({ user, token });
            next();
          });
      });
  });


