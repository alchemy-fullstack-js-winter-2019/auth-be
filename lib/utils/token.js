const jwt = require('jsonwebtoken');
const secret = process.env.AUTH_SECRET;

const EXPIRE_IN = '24h';

const tokenize = payload => {
  return jwt.sign({ payload }, secret, { expiresIn: EXPIRE_IN });
};

const untokenize = token => {
  const body = jwt.verify(token, secret, { expiresIn: EXPIRE_IN });
  return body.payload;
};

module.exports = {
  tokenize,
  untokenize
};
