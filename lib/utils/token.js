const jwt = require('jsonwebtoken');

const EXPIRE_IN = '1hr';

const tokenize = payload => {
  return jwt.sign({ payload }, 
    process.env.AUTH_SECRET,
    { expiresIn: EXPIRE_IN });
};

module.exports = {
  tokenize
};
