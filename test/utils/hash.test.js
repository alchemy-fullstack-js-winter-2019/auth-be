const bcrypt = require('bcryptjs');

describe('bcrypt', () => {
  it('hashes a password', () => {
    bcrypt.hash('password', 10)
      .then(password => {
        console.log(password);
        expect(password).toBeDefined();
      });
  });
});
