const bcrypt = require('bcryptjs');
const { hash } = require('../../lib/utils/hash');

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
    const versionInfo = '$2b$10$';
    const salt = '12jne9skdn3jdkskwopa98';
    const bcryptSalt = `${versionInfo}${salt}`;
    return bcrypt.hash('password', bcryptSalt)
      .then(password1 => {
        return Promise.all([
          Promise.resolve(password1),
          bcrypt.hash('password', bcryptSalt)
        ]);
      })
      .then(([hash1, hash2]) => {
        expect(hash1).toEqual(hash2);
      });
  });
  it('can compare hashes', () => {
    return bcrypt.hash('password', 10)
      .then(hashedPassword => {
        bcrypt.compare('password', hashedPassword)
          .then(res => {
            expect(res).toBeTruthy();
          });
      });
  });
  it('can hash a password via hash function', () => {
    return hash('password')
      .then(hashedPass => {
        expect(hashedPass).toBeDefined();
        expect(hashedPass).not.toEqual('password');
      });
  });
});
