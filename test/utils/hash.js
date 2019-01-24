const bcryptjs = require('bcryptjs');

const SALT_ROUNDS = 10;

const hash = str => {
  return bcryptjs.hash(str, SALT_ROUNDS);
};

module.exports = {
  hash
};
