const bearerToken = (req, res, next) => {
  const authHeader = req.get('Authorization') || '';

  const token = authHeader.replace(/Bearer\s/i, '');

  req.token = token;
  next();
};
   

const ensureAuth = (req, res, next) => {
  //assume that req.token exists
  //user.findbytoken(req.token)
  //them set req.user to found user
  //if no found user call 401 expired token
  //catch errors
  return User.findByToken


};

module.exports = {
  bearerToken, 
  ensureAuth
};

