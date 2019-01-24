const bcrypt = require('bcryptjs');

describe('hash tests', () => {
  it('hashes a password', () => {
    bcrypt.hash('password', 10)
    .then(hashedPassword => {
      expect(hashedPassword).toBeDefined();
    })
  });
  it('creates hashed passwords that are different', () => {
    bcrypt.hash('password', 10)
    .then(hashedPass1 => {
      bcrypt.hash('password', 10)
      .then(hashedPass2 => {
        expect(hashedPass1).not.toEqual(hashedPass2);
      })
    })
  })
})

