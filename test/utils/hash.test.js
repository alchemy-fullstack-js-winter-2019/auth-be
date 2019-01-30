/*eslint-disable no-console*/
const bcrypt = require('bcryptjs');
const { 
  hash,
  compare
} = require('../../lib/utils/hash');

describe('hashing functions', () => {

  it('hashes a password', () => {

    return bcrypt.hash('passowrd', 10)
      .then(hashedPassword => {
        console.log(hashedPassword);
        expect(hashedPassword).toBeDefined();
      });
  });

  it('creates hashed passwords that are different', () => {

    return bcrypt.hash('password', 10)
      .then(hashedPassword1 => {
        return Promise.all([
          Promise.resolve(hashedPassword1),
          bcrypt.hash('password', 10)
        ])
          .then(hashedPassword2 => {
            expect(hashedPassword1).not.toEqual(hashedPassword2);
          });
      });
  });

  it('creates the same hash given the same salt', () => {
    const salt = '$2b$10$THDse934gEFSDDFid4jDki';

    return bcrypt.hash('password', salt)
      .then(hashedPassword1 => {
        return Promise.all([
          Promise.resolve(hashedPassword1),
          bcrypt.hash('password', salt)
        ])
          .then(([hash1, hash2]) => {
            expect(hash1).toEqual(hash2);
          });
      });
  });

  it('can compare hashes based on the same pasword', () => {
    const password = 'password';

    return bcrypt.hash(password, 10)
      .then(hashedPassword => {
        return bcrypt.compare(password, hashedPassword);
      })
      .then(res => {
        expect(res).toBeTruthy();
      });
  });

  it('can compare hashes based on different pasword', () => {
    const password = 'password';

    return bcrypt.hash(password, 10)
      .then(hashedPassword => {
        return bcrypt.compare('apassword', hashedPassword);
      })
      .then(res => {
        expect(res).toBeFalsy();
      });
  });

  it('resolves a promise with a hashed password', () => {
    const password = 'password';

    return hash(password)
      .then(res => {
        expect(res).toBeDefined();
        expect(res).not.toEqual(password);
      });
  });

  it('can compare a password and a string', () => {
    return hash('password')
      .then(hashedPassword => {
        return compare('password', hashedPassword);
      })
      .then(res => {
        expect(res).toBeTruthy();
      });
  });

  it('can compare a bad password and string', () => {
    return hash('password')
      .then(hashedPassword => {
        return compare('badPassword', hashedPassword);
      })
      .then(res => {
        expect(res).toBeFalsy();
      });
  });

});
