const User = require('../../lib/models/User');

const bearerToken = (req, res, next) => {
  const token = req
    .get('Authorization')
    .replace(/Bearer\s/i, '');

  req.token = token;
  next();
};

const ensureAuth = (req, res, next) => {
  const token = bearerToken(req.token, res, next);
  const user = User.findByToken(token);
  req.user = user;
  next();
};

module.exports = { bearerToken, ensureAuth };
