const bcrypt = require('bcryptjs');
const { hash, compare } = require('../../lib/utils/hash');

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

  it('can compare password and string', () => {
    return hash('password')
      .then(hashedPassword => compare('password', hashedPassword))
      .then(res => expect(res).toBeTruthy());
  });

  it('can compare bad password and string', () => {
    return hash('password')
      .then(hashedPassword => compare('badness', hashedPassword))
      .then(res => expect(res).toBeFalsy);
  });
});
