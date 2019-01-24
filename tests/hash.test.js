const bcrypyt = require('bcryptjs');
const { hash, compare } = require('../lib/utils/hash');

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

  it('creates the same hash given the same salt', () => {
    const password = 'password';
    const versionInfo = '$2b$10$';
    const salt = 'ABCDFGHIJKLMNOPQRSTUVW';
    const bcryptSalt = `${versionInfo}${salt}`;
    return bcrypyt.hash('password', bcryptSalt)
      .then(hashedPassword => {
        return Promise.all([
          Promise.resolve(hashedPassword),
          bcrypyt.hash(password, bcryptSalt)
        ]);
      })
      .then(([hash1, hash2]) => {
        expect(hash1).toEqual(hash2);
      });
  });

  it('can compare hashes based on the same password', () => {
    const password = 'password';
    return bcrypyt.hash('password', 10)
      .then(hashedPassword => {
        return bcrypyt.compare(password, hashedPassword);
      })
      .then(result => {
        expect(result).toBeFalsey();
      });
  });

  it('can hash a password', () => {
    const password = 'password';
    return hash(password, 10)
      .then(hashedPassword => {
        expect(hashedPassword).toBeDefined();
        expect(hashedPassword).not.toEqual('password');
      });
  });

  it('can compare a password and a string', () => {
    const password = 'password';
    return hash(password)
      .then(hashedPassword => {
        return compare(password, hashedPassword);
      })
      .then(result => {
        expect(result).toBeTruthy();
      });
  });

  it('can compare a bad password and a string', () => {
    return hash('password')
      .then(hashedPassword => {
        return compare('badPassword', hashedPassword);
      })
      .then(result => {
        expect(result).toBeFalsy();
      });
  });
});
