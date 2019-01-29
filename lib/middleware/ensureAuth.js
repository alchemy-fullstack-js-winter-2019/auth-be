const User = require('../models/User');
const { HttpError } = require('../middleware/error');

const bearerToken = (req, res, next) => {
  const token = req
    .get('Authorization')
    .replace(/Bearer\s/i, '');
  req.token = token;
  next();
};

const ensureAuth = (req, res, next) => {
  return User.findByToken(req.token)
    .then(user => {
      if(user) {
        req.user = user;
      }
      else {
        next(new HttpError(401, 'invalid token'));
      }
    })
    .catch(next);
};

module.exports = { ensureAuth, bearerToken };
