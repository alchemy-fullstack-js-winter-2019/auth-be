const bcryptjs = require('bcryptjs');

const SALT_ROUNDS = 10;

const hash = string => {
  return bcryptjs.hash(string, SALT_ROUNDS);
};

const compare = (string, hash) => {
  return bcryptjs.compare(string, hash);
};

module.exports = {
  hash,
  compare
};
