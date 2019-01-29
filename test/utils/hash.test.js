const bcryptjs = require('bcryptjs');
const { hash, compare  } = require('../../lib/utils/hash');

describe.skip('bcrypt', () => {
  it('hashes a password', () => {
    return bcryptjs.hash('password', 10)
      .then(hashedPassword => {
        expect(hashedPassword).toBeDefined();
      });
  });
  it('creates hashed passwords that are different', () => {
    return bcryptjs.hash('password', 10)
      .then(hashedPassword1 => {
        return bcryptjs.hash('password', 10)
          .then(hashedPassword2 => {
            expect(hashedPassword1).not.toEqual(hashedPassword2);
          });
      }); 
  });
  it('creates the same hash given the same salt', () => {
    const password = 'passsword';
    const versionINfo = '$2b$10$';
    const salt = '1111111111111111111111';
    const bcryptSalt = `${versionINfo}${salt}`;
    return bcryptjs.hash(password, bcryptSalt)
      .then(hashedPassword1 => {
        return bcryptjs.hash(password, bcryptSalt)
          .then(hashedPassword2 => {
            expect(hashedPassword1).toEqual(hashedPassword2);
          });
      });
  });
  it('can compare hashes based on the same password', () => {
    return bcryptjs.hash('password', 10)
      .then(hashedPassword => {
        bcryptjs.compare('password', hashedPassword)
          .then(result => {
            expect(result).toBeTruthy();
          });
      });
  });
  it('can compare hashes based on the same password', () => {
    return bcryptjs.hash('password', 10)
      .then(hashedPassword => {
        bcryptjs.compare('badpassword', hashedPassword)
          .then(result => {
            expect(result).toBeFalsy();
          });
      });
  });
  it('takes a string and returns a hashed password', () => {
    return hash('password')
      .then(hashedPassword => {
        expect(hashedPassword).toBeDefined();
        expect(hashedPassword).not.toEqual('password');
      });  
  });
  it('can compare a string and a hash', () => {
    return hash('password')
      .then(hashedPassword => {
        return compare('password', hashedPassword);
      })
      .then(result => {
        expect(result).toBeTruthy();
      });
  });
  it('can compare a bad password and a hash', () => {
    return hash('password')
      .then(hashedPassword => {
        return compare('badpassword', hashedPassword);
      })
      .then(result => {
        expect(result).toBeFalsy();
      });
  });
  
});
