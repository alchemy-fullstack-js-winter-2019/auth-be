const jwt = require('jsonwebtoken');

const EXPIRE_IN = '1hr';

const tokenize = (payload) => { //function to create token
  return jwt.sign({ payload }, process.env.AUTH_SECRET, { expiresIn: EXPIRE_IN });
};

const untokenize = token => { //function take a token and get a user back
  const body = jwt.verify(token, process.env.AUTH_SECRET); //verify that token is valid and decrypting the token

  return body.payload; //this will remove all the info and only get pack the payload user info part back
};

module.exports = {
  tokenize,
  untokenize
};
