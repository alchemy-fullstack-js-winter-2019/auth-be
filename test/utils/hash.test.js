const bcrypt = require('bcryptjs');

describe('bcrypt', () => {
  it('hashes a password', () => {
    bcrypt.hash('password', 10)
      .then(password => {
        console.log(password);
        expect(password).toBeDefined();
      });
  });
  it('creates hashed passwords that are different', () => {
    bcrypt.hash('password', 10)
      .then(password1 => {
        bcrypt.hash('password', 10)
          .then(password2 => {
            expect(password1).not.toEqual(password2);
          });
      });
  });
});
