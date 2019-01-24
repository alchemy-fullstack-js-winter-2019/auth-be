const jwt = require('jsonwebtoken');
const secret = process.env.AUTH_SECRET;

const tokenize = payload => {
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

const untokenize = token => {
  const body = jwt.verify(token, secret, { expiresIn: '24h' });
  return body.payload;
};

module.exports = {
  tokenize,
  untokenize
};
