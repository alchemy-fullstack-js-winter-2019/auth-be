const User = require('../../lib/models/User');

const bearerToken = (req, res, next) => {
  const authHeader = req.get('Authorization') || '';
  const token = authHeader.replace(/Bearer\s/i, '');
  req.token = token;
  next();
};

const ensureAuth = (req, res, next) => {
  const user = User.findByToken(req.token);
  req.user = user;
  next();
};

module.exports = { bearerToken, ensureAuth };
