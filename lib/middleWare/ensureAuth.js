const User = require('../models/User');
const { HttpError } = require('./error');



const bearerToken = (req, res, next) => {
  const authHeader = req.get('Authorization') || '';
  //replaces bears and spaciing,(i) means whethere its capital or not. 
  const token = authHeader.replace(/Bearer\s/i, '');
  req.token = token;
  next();
};

const ensureAuth = (req, res, next) => {
  return User.findByToken(req.token)
    .then(user => {
      if(!user){
        return next(new HttpError(400, 'Not a valid token'));
      }
      req.user = user;
      next();
    }); 
    

};

module.exports = {
  bearerToken,
  ensureAuth
};

// get() {
//   return 'bearer adbddajsd'
// }

