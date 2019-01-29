const { Router } = require('express');
const User = require('../models/User');


module.exports = Router()
  .post('/signup', (req, res, next) => {
    const { email, password } = req.body;
    User
      .create({ email, password })
      .then(user => res.send({ user, token: user.authToken() }))
      .catch(next);
  })
  .post('signup/signin', (req, res, next) => {
    const {email, password} = req.body;
    User.find({ })
  })
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

