const jwt = require('jsonwebtoken');

const EXPIRE_IN = '1h';

const tokenize = payload => {
  return jwt.sign({ payload },
    process.env.AUTH_SECRET,
    { expiresIn: EXPIRE_IN });
};

const untokenize = token => {

};

module.exports = {
  tokenize,
  untokenize
};