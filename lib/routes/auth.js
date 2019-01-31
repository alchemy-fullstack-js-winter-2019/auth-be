const { Router } = require('express');
const User = require('../models/User');
const { HttpError } = require('../middleware/error');
const { ensureAuth } = require('../middleware/ensureAuth');



module.exports = Router()
  .post('/signup', (req, res, next) => {
    const { email, password } = req.body;
    User
      .create({ email, password })
      .then(user => res.send({ user, token: user.authToken() }))
      .catch(next);
  })
  .post('/signin', (req, res, next) => {
    const { email, password } = req.body;
    User
      .findOne({ email })
      .then(user => {
        if(!user) {
          console.log('hello');
          return next(new HttpError(401, 'badd email or password'));
        }
        return Promise.all([
          Promise.resolve(user),
          user.compare(password)
        ]);
      })
      .then(([user, correct]) => {
        if(correct) {
          res.send({
            user,
            token: user.authToken()
          });
        } else {
          console.log('second');

          next(new HttpError(401, 'baddder email or password'));

        }
      })
      .catch(next);
  })

  .get('/verify', ensureAuth, (req, res) => {
    res.send(req.user);
  });
//we use user.compare which is asynchronous and returns true or false, if the password is correct we use the user and token
// .post('/signup', (req, res, next) => {
//   const { email, password } = req.body;
//   User.findOne({ email })
//     .then(user =>{
//       if(user.eamain && user.password){
//       }
//     });
// });


//.repace(/Bearer\s/i) the \s gets whitespace/i makes it case insensitive. 

