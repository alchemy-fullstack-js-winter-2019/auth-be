const User = require('../models/User');

const bearerToken = (req, res, next) => {
  const token = req 
    .get('Authorization')
    .replace(/Bearer\s/i, '');
  req.token = token;
  next();
};

const ensureAuth = (req, res, next) => {
  const token = bearerToken();
  req.user = User.findByToken(token);
  next();
};


module.exports = { 
  bearerToken,
  ensureAuth
};
