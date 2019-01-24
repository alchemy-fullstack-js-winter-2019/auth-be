const bcrypt = require('bcryptjs');

describe('hash tests', () => {
  it('hashes a password', () => {
    const password = bcrypt.hash('password', 10);
  })
})

