const bcrypt = require('bcryptjs');

describe('hashing functions', () => {
  it('hashes a password', () => {
    return bcrypt.hash('password', 10)
    .then(hashedPassword => {
      expect(hashedPassword).toBeDefined();
    })
    });
  });