const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const { email, password } = req.body;
    User
      .create({
        email,
        password
      })
      .then(user => {
        return user.authToken();
      })
      .then((user, token) => {
        res.send({ user, token });
      })
      .catch(next);
  })
  .post('/signin', (req, res, next) => {
    const { email, password } = req.body;
    User
      .findOne({ email })
      .then(user => {
        if(user) {
          return user.compare(password)
            .then(user => {
              return user.authToken();
            })
            .then((user, token) => {
              res.send({ user, token });
            });
        }
        else {
          res.send('Bad email or password');
        }
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
