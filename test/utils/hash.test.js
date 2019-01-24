const bcryptjs = require('bcryptjs');
const { hash, compare } = require('../../lib/utils/hash');

describe('auth-be app', () => {
  it('hashes a password', () => {
    return bcryptjs.hash('password', 10)
    .then(hashedPassword => {
      // console.log(hashedPassword);
      expect(hashedPassword).toBeDefined()
    })
  });

  it('creates hashed passwords that are different', () => {
    const password = 'password';
    return bcryptjs.hash(password, 10)
    .then(hashedPassword1 => {
      return Promise.all([
        Promise.resolve(hashedPassword1),
        bcryptjs.hash(password, 10)
      ]);
    })
    .then(([hash1, hash2]) => {
      // console.log(hash1, hash2)
      expect(hash1).not.toEqual(hash2);
    });
  });

  it('creates the same hash given the same salt', () => {
    const salt = '$2b$10$8ud4h7sbfe0oemh5uRTsEq';
    return bcryptjs.hash('password', salt)
    .then(hashedPassword1 => {
      return Promise.all([
        Promise.resolve(hashedPassword1),
        bcryptjs.hash('password', salt)
      ]);
    })
    .then(([hash1, hash2]) => {
      // console.log('creates the same hash given the same salt:', hash1, hash2)
      expect(hash1).toEqual(hash2);
    });
  });

  it('can compare hashes based on the same password', () => {
    const password = 'password';
    return bcryptjs.hash(password, 10)
    .then(hash => {
      bcryptjs.compare(password, hash)
      .then(res => {
        // console.log(res); // returns 'true'
        expect(res).toBeTruthy();
      })
    })
  });

  it('can compare hashes based on different passwords', () => {
    return bcryptjs.hash('password', 10)
    .then(hash => {
      bcryptjs.compare('booboo', hash)
      .then(res => {
        // console.log(res); // returns 'false'
        expect(res).toBeFalsy();
      })
    })
  });

  // create a hash function that takes a string 
  // and returns a promise that resolves with a hashed password.
  it('can take a string and return a hashed password', () => {
    return hash('blahblah')
    .then(hashedPassword => {
      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).not.toEqual('blahblah');
    });
  });

  // create a compare function that takes a password string 
  // and hash and returns a promise that resolves to true
  // * if the password matches the hash, otherwise false
  it('can take a password + hash, compare, and return true if match', () => {
    return hash('blahblah')
    .then(hashed => {
      return compare('blahblah', hashed)
      .then(res => {
        expect(res).toBeTruthy();
      })
    })
  });
  it('can take a password + hash, compare, and return false if not match', () => {
    return hash('blahblah')
    .then(hashed => {
      return compare('boo', hashed)
      .then(res => {
        expect(res).toBeFalsy();
      })
    })
  });

});
