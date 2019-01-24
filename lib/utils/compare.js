const bcryptjs = require('bcryptjs');

module.exports = (string, hash) => {
  return Promise.resolve(bcryptjs.compare(string, hash));
};
