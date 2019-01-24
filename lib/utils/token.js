const jwt = require('jsonwebtoken');
const secret = process.env.AUTH_SECRET;

const tokenize = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

module.exports(tokenize);
