const { HttpError } = require('./error');
const { untokenize } = require('../utils/token');

const findAuthToken = req => {
  const token = req
    .get('Authorization')
    .replace(/Bearer\s/i, '');

  return req.token = token;
};

const ensureAuth = (req, res, next) => {
  findAuthToken(req);
  const user = untokenize(req.token);
  if(!user) return next(new HttpError(400, 'Not a valid token'));

  req.user = user;
  next();
};

module.exports = {
  findAuthToken,
  ensureAuth
};
