const bcrypt = require('bcryptjs');

describe('hashing', () => {
  it('hashes a password', () => {
    bcrypt.hash('password', 10)
      .then(hashedPassword => expect(hashedPassword).toBeDefined());
  });

  it('creates hashed passwords that are different', () => {
    return bcrypt.hash('password', 10)
      .then(hashedPassword1 => {
        return Promise.all([
          Promise.resolve(hashedPassword1),
          bcrypt.hash('password', 10)
        ]);
      })
      .then(([hashedPassword1, hashedPassword2]) => expect(hashedPassword1).not.toEqual(hashedPassword2));
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
      .then(([hash1, hash2]) => expect(hash1).toEqual(hash2));
  });
});
