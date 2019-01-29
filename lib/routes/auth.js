const { Router } = require('express');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    { email, password } = req.body;
    User.create({ email, password })
      .then(user.authToken())
      .then(respond => {
        res.send({ user, token });
      });
  });