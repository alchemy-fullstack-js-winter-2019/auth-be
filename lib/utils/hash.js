const bcrypt = require('bcrypt');

//because 10 will stay the same and its a convetion to have an _ for consts like these. 
const SALT_ROUNDS = 10;

//the str is whatever the pw will be. 
const hash = (str) => {
  return bcrypt.hash(str, SALT_ROUNDS);
};

//this returns a promise that resolves..
const compare = (str, hash) => {
  return bcrypt.compare(str, hash);
};

module.exports = {
  hash,
  compare
};
