const bcryptjs = require('bcryptjs');

module.exports = string => {
  return Promise.resolve(bcryptjs.hash(string, 10));
};
