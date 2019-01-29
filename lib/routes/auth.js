const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  
.post('/signup', (req, res, next) => {
    const { email, password } = req.body;
    User
      .create({ email, password })
      .then(user => res.send({ user, token: user.authToken() }))
      .catch(next);
    });
  
.post('/signin', (req, res, next) => {
  const { email, password } = req.body;
  Users.findOne({
    email
  })
  .then(user => {
    return Promise.all ([
      Promise.resolve(user),
      user.compare(password)
    ]);
  })
  res.send({user, token: user.authToken() });
});
