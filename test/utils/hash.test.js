const bcrypt = require('bcryptjs');

describe('hashing', () => {
  it('hashes a password', () => {
    bcrypt.hash('password', 10)
      .then(hashedPassword => expect(hashedPassword).toBeDefined());
  });
});
