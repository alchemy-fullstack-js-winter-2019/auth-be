const jwt = require('jsonwebtoken');

const EXPIRE_IN = 24;

// Encrypt the user object to get a token
// process.env.AUTH_SECRET covers up the payload with a // secret long string (not a hash because a hash is one way)
const tokenize = (payload) => {
  return jwt.sign({ payload }, process.env.AUTH_SECRET, { expiresIn: EXPIRE_IN });
};

// Decrypt token to get user object
const untokenize = (token) => {
  const body = jwt.verify(token, process.env.AUTH_SECRET);

  // Just get the user part of the verified body which is the payload
  return body.payload;
};

module.exports = {
  tokenize,
  untokenize
};
