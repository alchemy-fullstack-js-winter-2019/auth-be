const bcrypt = require('bcryptjs');

describe('hashing functions', () => {
  it('hashes a password', () => {
    return bcrypt.hash('password', 10)
    .then(hashedPassword => {
      expect(hashedPassword).toBeDefined();
    })
    });
    it('creates a hashed password that is different', () => {
      const password = 'password';
      return bcrypt.hash(password, 10)
      .then(hashedPassword1 => {
        return Promise.all([
          Promise.resolve(hashedPassword1),
          bcrypt.hash(password, 10)
        ]);
        })
        .then(([hash1, hash2]) => {
          expect(hash1).not.toEqual(hash2);
        });
      });

    it('creates the same hash given the same salt', () => {
      const password = 'password';
      const versionInfo = '$2b$10$';
      const salt = 'ABCDEFGHIJKLMNOPQRSTUV';
      const bcryptSalt = `${versionInfo}${salt}`;
      return bcrypt.hash(password, bcryptSalt)
      .then(hashedPassword => {
      return Promise.all([
        Promise.resolve(hashedPassword),
        bcrypt.hash(password, bcryptSalt)
      ]);
    })
    .then(([hash1, hash2]) => {
      expect(hash1).toEqual(hash2);
    });
    });
  });