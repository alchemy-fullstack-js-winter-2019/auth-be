require('dotenv').config();
const jwt = require('jsonwebtoken');

const EXPIRE_IN = '1hr';

const tokenize = payload => {
  return jwt.sign({ payload }, 
    process.env.AUTH_SECRET,
    { expiresIn: EXPIRE_IN });
};

const untokenize = token => {
  const body = jwt.verify(token, process.env.AUTH_SECRET).payload;
  return body;
};


module.exports = {
  tokenize,
  untokenize
};
