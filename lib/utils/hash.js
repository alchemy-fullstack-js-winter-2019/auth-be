const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;

const hash = (str) => {
  return bcrypt.hash(str, SALT_ROUNDS);
};

const compare = (str, hash) => {

};

module.exports = {
  hash,
  compare
};