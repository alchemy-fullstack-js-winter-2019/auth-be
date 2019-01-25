const jwt = require('jsonwebtoken');

const tokenize = (payload) => {
  return jwt.sign({ payload }, process.env.AUTH_SECRET, { expiresIn: '1h' });
};

const untokenized = (token) => {
  const body = jwt.verify(token, process.env.AUTH_SECRET);

  return body.payload;
};

module.exports = {
  tokenize,
  untokenized
};
