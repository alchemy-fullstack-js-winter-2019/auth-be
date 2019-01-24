const bcryptjs = require('bcryptjs');

const SALT_ROUNDS = 10;

const hash = str => {
  return bcryptjs.hash(str, SALT_ROUNDS);
};

const compare = (str, hash) => {
  return bcryptjs.compare(str, hash);
};

module.exports = {
  hash,
  compare
};
