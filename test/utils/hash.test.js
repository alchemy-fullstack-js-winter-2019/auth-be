const bcrypt = require('bcryptjs');

describe('hashing', () => {
  it('hashes a password', () => {
    bcrypt.hash('password', 10)
      .then(hashedPassword => expect(hashedPassword).toBeDefined());
  });

  it('creates hashed passwords that are different', () => {
    bcrypt.hash('password', 10)
      .then(hashedPassword1 => {
        return Promise.all([
          Promise.resolve(hashedPassword1),
          bcrypt.hash('password', 10)
        ]);
      })
      .then(([hashedPassword1, hashedPassword2]) => expect(hashedPassword1).to.not.Equal(hashedPassword2));
  });
});
