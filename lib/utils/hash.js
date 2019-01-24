const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;

const hash = (str) => {
  return bcrypt.hash(str, SALT_ROUNDS);
};

module.exports = {
  hash
};
