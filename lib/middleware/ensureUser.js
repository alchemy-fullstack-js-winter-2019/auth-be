const User = require('../../lib/models/User');

const bearerToken = (req, res, next) => {
  const token = req.get('Authorization').replace(/Bearer\s/i, '');

  req.token = token;
  next();
};

const ensureAuth = (req, res, next) => {
  const token = req.token;
  const foundToken = token.findAuthToken();

  if(foundToken){
    User.findByToken(token)
      .then(user => {
        req.user = user;
      })
      .next();
  }
};


module.exports = {
  bearerToken,
  ensureAuth
};
