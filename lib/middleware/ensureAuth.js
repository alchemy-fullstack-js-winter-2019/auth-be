const User = require('../models/User');
const { HttpError } = require('./error');

const bearerToken = (req, res, next) => {
  const authHeader = req.get('Authorization') || '';
  const token = 
    authHeader
      .replace(/Bearer\s/i, ''); //strips out the word Bearer the i makes it case insensitive

  req.token = token;
  next();

};

const ensureAuth = (req, res, next) => {
  //assume that req.token
  //User.findByToken(req.token) to find a user - this returns a user
  return User.findByToken(req.token)
    .then(user => {
      if(!user) {
        return next(new HttpError (400, 'Not a valid token'));
      }
      req.user = user;
      next();
    })
    .catch(next);
  //-> then set req.user to the found user

  //-> if no found user next with error i.e. 404 invalid token 
  //-> catch(next)
};

module.exports = {
  bearerToken,
  ensureAuth
};
