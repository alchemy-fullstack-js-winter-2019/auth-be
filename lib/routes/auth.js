const Users = require('../models/User');
const Router = require('express').Router;
const { HttpError } = require('../middleware/error');

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
        return Promise.all([
          Promise.resolve(user),
          user.compare(password)
        ]);
      })
      .then(([user, correct]) => {
        if(correct) {
          res.send({ 
            user, 
            token: user.makeToken()
          });
        }
        else {
          next(new HttpError(401, 'Bad email or password'));
        }
      });
  });


