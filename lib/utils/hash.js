const bcrypt = require('bcryptjs');

const hash = str => {
  return bcrypt.hash(str, 10)
    .then(hashed => {
      return hashed;
    });
};

module.exports = {
  hash
};
