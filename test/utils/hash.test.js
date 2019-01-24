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
  });
  it('it creates the same hash given the same salt',() => {
    const salt = '$2b$10$1234567891234567891234';
    bcrypt.hash('password', salt)
      .then(hashed1 => {
        bcrypt.hash('password', salt)
          .then(hashed2 => {
            expect(hashed1).toEqual(hashed2)
          })
      })
  });
  it('it can compare hashes based on the same password', () => {
    bcrypt.hash('password', 10)
      .then(hashed => {
        bcrypt.compare('password', hashed)
        .then(result => {
          expect(result).toBeTruthy();
        })
      })
  });
  
})

