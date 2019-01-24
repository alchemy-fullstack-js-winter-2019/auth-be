const bcrypt = require('bcryptjs');

const hash = str => {
  return bcrypt.hash(str, 10)
    .then(hashedPassword => {
      return Promise.all([
        Promise.resolve(hashedPassword)
      ]);
    });
};

module.exports = { hash };
