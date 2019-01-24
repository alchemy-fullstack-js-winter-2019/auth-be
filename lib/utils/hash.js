const bcrypt = require('bcryptjs');

const hash = str => {
  return bcrypt.hash(str, 10)
    .then(hashed => {
      return hashed;
    });
};
const compare = (str, hash) => {

};


module.exports = {
  hash,
  compare
};
