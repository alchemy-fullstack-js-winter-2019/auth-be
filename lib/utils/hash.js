const bcrypt = require('bcryptjs');

const hash = str => {
  return bcrypt.hash(str, 10)
    .then(hashed => {
      return hashed;
    });
};
const compare = (str, hash) => {
  return bcrypt.compare(str, hash)
    .then(res => {
      return res;
    });
};

module.exports = {
  hash,
  compare
};
