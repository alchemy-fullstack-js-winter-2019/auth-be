const { Router } = require('express');
const User = require('../models/User');
const { HttpError } = require('../middleware/error');


const auth = Router()
  .post('/signup', (req, res, next) => {
    const { email, password } = req.body;
    User
      .create({ email, password })
      .then(user => {
        res.send({ user, token: user.authToken() });
      })
      .catch(next);
  })

  .post('/signin', (req, res, next)=> {
    const { email, password } = req.body;
    User
      .findOne({ email })
      
      .then(user => user.compare(password))

      .then(passwordCorrect => {

        if(passwordCorrect) {
          res.send({ user, token: user.authToken() });
        }
        else next(new HttpError(401, 'username/password invalid'));
      })
      .catch(next);
      
  });
 
module.exports = auth;

