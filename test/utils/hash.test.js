const bcrypt = require('bcryptjs');

describe('bcrypt', () => {
  it('hashes a password', () => {
    return bcrypt.hash('password', 10)
      .then(hashedPassword => {
        expect(hashedPassword).toBeDefined();
      });
  });
  it('creates hashed passwords that are different', () => {
    return bcrypt.hash('password', 10)
      .then(password1 => {
        return Promise.all([
          Promise.resolve(password1),
          bcrypt.hash('password', 10)
        ]);
      })
      .then(([hash1, hash2]) => {
        expect(hash1).not.toEqual(hash2);
      });
  });
  it('creates the same hash given the same salt', () => {
    const salt = '$2b$10$12jne9skdn3jdkskwopa98';
    return bcrypt.hash('password', salt)
      .then(password1 => {
        return Promise.all([
          Promise.resolve(password1),
          bcrypt.hash('password', salt)
        ]);
      })
      .then(([hash1, hash2]) => {
        expect(hash1).toEqual(hash2);
      });
  });
});
