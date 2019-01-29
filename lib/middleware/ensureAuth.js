const bearerToken = (req, res, next) => {
  const authHeader = req.get('Authorization') || '';
  const token = authHeader.replace(/Bearer\s/i, '');
  req.token = token;
  next();
};

const ensureAuth = (req, res, next) => {
  // assume that req.token exists
  
  //User.findByToken(req.token)
  User.findByToken(req.token)
  // -> then set req.user to the found user
  const foundUser = req.user;
  // -> if not found user next with error
  if(!user) {
    // -> catch(next)
    .catch(next);

  }
};

module.exports = {
  bearerToken
};