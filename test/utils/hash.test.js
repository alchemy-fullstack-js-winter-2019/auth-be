const bcryptjs = require('bcryptjs');
const { hash, compare } = require('../../lib/utils/hash');

describe('bcrypt', () => {
  it('hashes a password', () => {
    return bcryptjs.hash('password', 10)
      .then(hashedPassword => {
        expect(hashedPassword).toBeDefined();
        console.log(hashedPassword);      
      });
  });

  it('creates hashed passwords that are different', () => {
    const password = 'roxy';
    return bcryptjs.hash(password, 10)
      .then(hashedPassword1 => {
        return bcryptjs.hash(password, 10)
          .then(hashedPassword2 => {
            expect(hashedPassword1).not.toEqual(hashedPassword2);
          });
      });
  });

  it('creates the same hash given the same salt', () => {
    const version = '$2b$10$';
    const salt = 'fkdlskei3lsjvbcneosntl';
    const bcryptSalt = `${version}${salt}`;
    const password = 'roxy';
    return bcryptjs.hash(password, bcryptSalt)
      .then(hashedPassword1 => {
        return bcryptjs.hash(password, bcryptSalt) 
          .then(hashedPassword2 => {
            expect(hashedPassword1).toEqual(hashedPassword2);
          });
      });
  });

  it('can compare hashes based on the same password', () => {
    return bcryptjs.hash('fuego', 10)
      .then(hashedPassword => {
        bcryptjs.compare('fuego', hashedPassword)
          .then(result => {
            expect(result).toBeTruthy();
          });
      });
  });

  it('can compare hashes based on a different password', () => {
    return bcryptjs.hash('fuego', 10)
      .then(hashedPassword => {
        bcryptjs.compare('wrongfuego', hashedPassword)
          .then(result => {
            expect(result).toBeFalsy();
          });
      });
  });
});

describe('hash function', () => {
  it('can return a hashed version of a string password passed in', () => {
    const string = 'colonelmustard';
    return hash(string)
      .then(hashedPassword => {
        expect(hashedPassword).toBeDefined();
        expect(hashedPassword).not.toEqual(string);
      });
  });
});

describe('compare function', () => {
  it('can compare a hashed version of a string with the original string password', () => {
    const string = 'colonelmustard';
    return hash(string)
      .then(hashedPassword => {
        return compare(string, hashedPassword)
          .then(result => {
            expect(result).toBeTruthy();
          });
      });
  });

  it('can compare a bad password with the original string password', () => {
    const string = 'colonelmustard';
    return hash(string)
      .then(hashedPassword => {
        return compare('wrongstring', hashedPassword)
          .then(result => {
            expect(result).toBeFalsy();
          });
      });
  });
});
