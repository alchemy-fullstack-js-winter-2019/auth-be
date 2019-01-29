const { HttpError } = require('./error');
const User = require('../models/User');

const bearerToken = (req, res, next) => {
  const authHeader = req.get('Authorization') || '';
  const token = authHeader
    .replace(/Bearer\s/i, '');
  req.token = token;
  next();
};

const ensureAuth = (req, res, next) => {
  return User.findByToken(req.token)
    .then(user => {
      if(!user) {
        return next(new HttpError(401, 'Token required'));
      } else {
        req.user = user;
      }
    })
    .catch(next);
};

module.exports = {
  ensureAuth,
  bearerToken
};
