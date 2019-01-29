const User = require('../lib/models/User');
const { HttpError } = require('../middleware/error'); 

const bearerToken = (req, res, next) => {
  const authHeader = req.get('Authorization') || '';
  const token = authHeader.replace(/Bearer\s/i, '');
  
  req.token = token;
  next();
};


const ensureAuth = (req, res, next) => {
  User.findByToken(req.token)
    .then(user => {
      if(!user) {
        return next(new HttpError(400, 'Not a valid token'));
      }

      req.user = user;
    })
    .catch(next);

};

module.exports = {
  bearerToken,
  ensureAuth
};
