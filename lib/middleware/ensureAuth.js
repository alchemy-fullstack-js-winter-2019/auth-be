const User = require('../../lib/models/User');
const HttpError = require('../middleware/error');

const bearerToken = (req, res, next) => {
  const token = req
    .get('Authorization')
    .replace(/Bearer\s/i, '');

  req.token = token;
  next();
};

const ensureAuth = (req, res, next) => {
  const token = req
    .get('Authorization')
    .replace(/Bearer\s/i, '');
  req.token = token;

  if(req.token) {
    const user = User.findByToken(req.token);
    req.user = user;
    next();
  } else {
    next(new HttpError(401, 'Token required'));
  }
};

module.exports = {
  bearerToken,
  ensureAuth
};
