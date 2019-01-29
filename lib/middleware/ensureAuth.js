const User = require('../models/User');
const { HttpError } = require('../middleware/error');

const bearerToken = (req, res, next) => {
  const authHeader = req.get('Authorization') || '';
  const token = authHeader.replace(/Bearer\s/i, '');

  req.token = token;
  next();
};

const ensureAuth = (req, res, next) => {
  return User.findByToken(req.token)
    .then(user => {
      console.log('req', req.token);
      console.log('token', user);
      if(!user) {
        return next(new HttpError(400, 'Not a valid token'));
      }
      req.user = user;
      next();
    })
    .catch(next);
};


module.exports = { 
  bearerToken,
  ensureAuth
};
