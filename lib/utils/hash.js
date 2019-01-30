const bcrypt = require('bcryptjs');

// When using a real constant - convention to use all caps
const SALT_ROUNDS = 10;

const hash = str => {
  return bcrypt.hash(str, SALT_ROUNDS);
};

const compare = (str, hash) => {
  return bcrypt.compare(str, hash);
};

module.exports = {
  hash,
  compare
};
