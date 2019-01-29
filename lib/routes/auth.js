const { Router } = require('express');
const User = require('../models/User');
const { HttpError } = require('../middleware/error');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const { email, password } = req.body;
    User.create({ email, password })
      .then(user => {
        res.send({ user, token: user.authToken() });
      })
      .catch(next);
  })

  .post('/signin', (req, res, next) => {
    const { email, password } = req.body;
    User
      .findOne({ email })
      .then(user => {
        return Promise.all([
          Promise.resolve(user),
          user.compare(password)
        ])
          .then(([user, passwordCorrect]) => {
            if(passwordCorrect) {
              res.send({ user, token: user.authToken() });
            }
            else {
              next(new HttpError(401, 'Invalid password or username'));
            }
          });
      })
      .catch(next);
  });

// .get('/verify', ensureAuth, (req, res, next) => {
//   User
//     .find()
//     .then(listOfUsers => {
//       res.send(listOfUsers);
//     })
//     .catch(next);
// })
// .get('/:id', (req, res, next) => {
//   User
//     .findById(req.params.id)
//     .then(foundUser => {
//       res.send(foundUser);
//     })
//     .catch(next);
// })
// .delete('/:id', (req, res, next) => {
//   User.findByIdAndDelete(req.params.id)
//     .then(() => {
//       res.send({ deleted: 1 });
//     })
//     .catch(next);
// });  
