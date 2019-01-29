const User = require('../models/User');
const HttpError = require('../middleware/error');

const bearerToken = (req, res, next) => {
  const authHeader = req.get('Authorization') || '';
  const token = authHeader.replace(/Bearer\s/i, '');

  req.token = token;
  next();
};

const ensureAuth = (req, res, next) => {
  return User.findByToken(req.token)
    .then(user => {
      if(!user) {
        return next(new HttpError(400, 'Bad Token'));
      }
      req.user = user;
    })
    .catch(next);
};


module.exports = { 
  bearerToken,
  ensureAuth
};
