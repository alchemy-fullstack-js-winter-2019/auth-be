const User = require('../../lib/models/User');
// const { HttpError } = require('../middleware/error');
const { HttpError } = require('./error');

const bearerToken = (req, res, next) => {
  const authHeader = req.get('Authorization') || '';  
  const token = authHeader.replace(/Bearer\s/i, '');

  req.token = token;
  next();
};

const ensureAuth = (req, res, next) => {
  // assume that req.token
  // User.findByToken(req.token)
  // User.findById(id)  // returns a promise
  return User.findByToken(req.token) // returns a promise
    .then(user => {
    // -> if no found user invoke next with error
      if(!user) {
        return next(new HttpError(400, 'Not a valid token'));
      }
      // => then set req.user to the found user
      req.user = user;
      next();
    })
    // -> catch(next)
    .catch(next);
};

module.exports = {
  bearerToken,
  ensureAuth
};
