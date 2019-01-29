// const { HttpError } = require('./error');
// const User = require('../models/User');

const bearerToken = (req, res, next) => {
  const token = req
    .get('Authorization')
    .replace(/Bearer\s/i, '');
  req.token = token;
  next();
};

// const ensureAuth = (req, res, next) => {
//   // use bearerToken to get a token
//   bearerToken(req.token)
//     .then(token => {
//       // if there is not a token return (using next)
//       // a 401 "Token required" error
//       if(!token) {
//         return next(new HttpError(401, 'Token required'));
//       } else {
//         // otherwise use User.findByToken to get the user
//         User.findByToken(token)
//         // then set req.user to the user and invoke next
//           .then(user => user === req.user)
//           .next();
//       }
//     });
// };

module.exports = {
  // ensureAuth,
  bearerToken
};
