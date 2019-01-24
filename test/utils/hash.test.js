const bcryptjs = require('bcryptjs');

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
      console.log('creates the same hash given the same salt:', hash1, hash2)
      expect(hash1).toEqual(hash2);
    });
  });

  it('can compare hashes based on the same password', () => {
    const password = 'password';
    return bcryptjs.hash(password, 10)
    .then(hash => {
      bcryptjs.compare(password, hash)
      .then(res => {
        console.log(res); // returns 'true'
        expect(res).toBeTruthy();
      })
    })
  });

});
