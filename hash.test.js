const bcrypyt = require('bcryptjs');

describe('hashing functions', () => {
  it('hashes a password', () => {
    return bcrypyt.hash('password', 10)
      .then(hashedPassword => {
        expect(hashedPassword).toBeDefined;
      });
  });

  it('creates hashed passwords that are different', () => {
    const password = 'password';
    bcrypyt.hash(password, 10)
      .then(hashedPassword1 => {
        return bcrypyt.hash(password, 10)
          .then(hashedPassword2 => {
            expect(hashedPassword1).toEqual(hashedPassword2);
          });
      });
  });
});
